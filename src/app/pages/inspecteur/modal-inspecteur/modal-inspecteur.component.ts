import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { User } from '../../utilisateur/user';
import { UserService } from '../../utilisateur/user.service';
import { Inspecteur } from '../inspecteur';
import { InspecteurService } from '../inspecteur.service';

@Component({
  selector: 'ngx-modal-inspecteur',
  templateUrl: './modal-inspecteur.component.html',
  styleUrls: ['./modal-inspecteur.component.scss']
})
export class ModalInspecteurComponent implements OnInit {

  A: string
  inspecteur: Inspecteur
  user: User
  testchaine : string
  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private inspecteurService: InspecteurService,
    private userService: UserService) { }

  async ngOnInit() {
    let e = localStorage.getItem('e');
    this.user = new User() 
    this.inspecteur = new Inspecteur();
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.inspecteur = await this.inspecteurService.getById(+id)
      this.user = await this.userService.getById(this.inspecteur.user.id)
    }
  }


  fermer() {
    this.windowRef.close();
  }

  calculateUser($event){
    //this.user.pseudo = this.inspecteur.nom.substring(0,3)
  }


  async onAddInspecteur() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.user.role = "inspecteur"
      this.userService.addUser(this.user)
      this.user = await this.userService.getByPseudo(this.user.pseudo) 
      console.log(this.user.id)
      this.inspecteurService.addInspecteur(this.inspecteur, this.user.id)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/inspecteur']));
      this.toastrService.success("Succès", "Inspecteur ajouté");
    }
    if (e === '1') {
      this.userService.editUser(this.user)
      this.inspecteurService.editInspecteur(this.inspecteur, this.user.id)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/inspecteur']));
      this.toastrService.success("Succès", "Inspecteur modifié");
    }
  }


}
