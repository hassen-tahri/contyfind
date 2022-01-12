import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { User } from '../../utilisateur/user';
import { Chargeur } from '../chargeur';
import { ChargeurService } from '../chargeur.service';

@Component({
  selector: 'ngx-show-chargeur',
  templateUrl: './show-chargeur.component.html',
  styleUrls: ['./show-chargeur.component.scss']
})
export class ShowChargeurComponent implements OnInit {


  chargeur : Chargeur
  user : User
  haveUser : boolean
  constructor(public windowRef: NbWindowRef,
    private chargeurService : ChargeurService) { }
 
 async  ngOnInit() {
    this.user = new User()
    this.chargeur = new Chargeur()
    let id = localStorage.getItem('id'); 
    this.chargeur = await this.chargeurService.getById(+id)
    if(!!this.chargeur.user)
    {this.user = this.chargeur.user
    this.haveUser = true}
  }

  fermer()
  {
    this.windowRef.close();
  }

}
