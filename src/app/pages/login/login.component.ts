import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesComponent } from '../pages.component';
import { User } from '../utilisateur/user';
import { UserService } from '../utilisateur/user.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  siteKey: string
  session: any
  msg: any
  utilisateur: any
  pseudoCrypte: string
  roleCrypte: string
  showPassword = false;


  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;


  constructor(private userService: UserService, private router: Router, )
   { this.siteKey = "6Lcgj3EaAAAAAGEzljx0CcIPGj6yn_qawn6IuhMD" }

  async ngOnInit() {
    localStorage.clear()
    localStorage.setItem("connecte", "false")
    this.session = new User()
    this.msg = ''
  }





  async connecter() {
   // this.handleLogin()
    this.utilisateur = await this.userService.getByPseudo(this.session.pseudo)
    if (this.utilisateur == null) { this.msg = "Utilisateur introuvable"; }
    else {
      if (this.session.mpd != this.utilisateur.mpd) { this.msg = "Mot de passe incorrect" }
      else {
        this.msg = null
        //user
        localStorage.setItem(PagesComponent.userSession, this.utilisateur.pseudo)
        //role
        localStorage.setItem(PagesComponent.role, this.utilisateur.role)
        //etatSession
        localStorage.setItem(PagesComponent.connecte, "true")
        //etatSession
        localStorage.setItem(PagesComponent.userId, this.utilisateur.id)
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages']));
      }
    }
  }



  //input password
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }



}
