import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { User } from '../../utilisateur/user';
import { Inspecteur } from '../inspecteur';
import { InspecteurService } from '../inspecteur.service';

@Component({
  selector: 'ngx-show-inspecteur',
  templateUrl: './show-inspecteur.component.html',
  styleUrls: ['./show-inspecteur.component.scss']
})
export class ShowInspecteurComponent implements OnInit {

  inspecteur : Inspecteur
  user : User
  constructor(public windowRef: NbWindowRef,
    private inspecteurService : InspecteurService) { }

  async ngOnInit(){
    this.inspecteur = new Inspecteur()
    this.user = new User()
    let id = localStorage.getItem('id'); 
    this.inspecteur = await this.inspecteurService.getById(+id)
    this.user = this.inspecteur.user
  }

  fermer()
  {
    this.windowRef.close();
  }

}
