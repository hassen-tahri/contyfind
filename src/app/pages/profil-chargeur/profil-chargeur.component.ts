import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Chargeur } from '../chargeur/chargeur';
import { ChargeurService } from '../chargeur/chargeur.service';
import { PagesComponent } from '../pages.component';
import { User } from '../utilisateur/user';
import { UserService } from '../utilisateur/user.service';

@Component({
  selector: 'ngx-profil-chargeur',
  templateUrl: './profil-chargeur.component.html',
  styleUrls: ['./profil-chargeur.component.scss']
})
export class ProfilChargeurComponent implements OnInit {
  showPassword = false;
  chargeur : Chargeur
  user : User
  constructor(private chargeurService : ChargeurService ,
    private userService : UserService,
    private router : Router,
    private toastrService:NbToastrService) { }

  async ngOnInit()  {
    let userId = localStorage.getItem(PagesComponent.userId)
    this.chargeur = new Chargeur()
    this.user = new User()
    this.user = await this.userService.getById(+userId)
    this.chargeur = await this.chargeurService.getByUserId(+userId)
  }

  async save()
  { this.chargeurService.editChargeur(this.chargeur, this.user.id)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/pages/profilChargeur']));
    this.toastrService.success("Succès","Détails sauvgardé");
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
