import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  pseudoCrypte : string
  roleCrypte : string
  checked : boolean


  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;


  constructor(private userService: UserService, private router: Router, /* private authenticationService: AuthenticationService */) { this.siteKey = "6Lcgj3EaAAAAAGEzljx0CcIPGj6yn_qawn6IuhMD" }

  async ngOnInit() {
    localStorage.clear()
    localStorage.setItem("connecte","false")
    this.session = new User()
    this.msg=''
  }

  handleLogin() {
/*     this.authenticationService.authenticationService("adminSpringSecurity", "adminMdpSpringSecurity").subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });   */    
  }




  async connecter() {
    this.handleLogin()
    this.utilisateur = await this.userService.getByPseudo(this.session.pseudo)
    if (this.utilisateur == null) { this.msg = "Utilisateur introuvable";}
    else {
      if (this.session.mpd != this.utilisateur.mpd) { this.msg = "Mot de passe incorrect" }
      else {
        this.msg = null
        if(this.checked == true){
        //user
        localStorage.setItem("8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", "3aece11fa283b0163809c4c616aed927ba16d"+this.utilisateur.pseudo+"7ac31a8f5600bb92d55322cda12")
        //role
        localStorage.setItem("4b168d88dc872a7753c2bc35b36a2d4249487af55baf78f247f38cae2fe962da", "bde908bd4dee"+this.utilisateur.rolepseudo+"bb8a81f6")
        //etat
        localStorage.setItem("connecte","true")
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages']));
      }}
    }
  }

  setCheckedStatus(checked) {
    this.checked = checked.target.checked; // your variable
}

}
