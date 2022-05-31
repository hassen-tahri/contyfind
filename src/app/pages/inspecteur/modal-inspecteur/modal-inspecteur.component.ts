import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Mail } from '../../mailing/mail';
import { MailService } from '../../mailing/mail.service';
import { PagesComponent } from '../../pages.component';
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
  urlDomaine = PagesComponent.urlDomaine
  A: string
  inspecteur: Inspecteur
  user: User
  editingUser: boolean
  mail: Mail

  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private inspecteurService: InspecteurService,
    private userService: UserService,
    private mailService: MailService) { }

  async ngOnInit() {
    this.editingUser = true
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


  async onAddInspecteur() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.user.role = "inspecteur"
      if (!!await this.userService.getByPseudo(this.user.pseudo)) {
        this.toastrService.danger("Alert", "Pseudo invalide il faut le changer")
        this.editingUser = false
      }
      else if (!!this.user.pseudo && !!this.user.mpd) {
        this.userService.addUser(this.user)
        await this.delay(500)
        this.user = await this.userService.getByPseudo(this.user.pseudo)
      //  console.log(this.user.id)
        this.inspecteurService.addInspecteur(this.inspecteur, this.user.id)
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/esurveys']));
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages/inspecteur']));
        this.toastrService.success("Succès", "Inspecteur ajouté");
       // this.mail = this.calculateMail(this.user, this.inspecteur)
       // this.mailService.sendMail(this.mail)
      }
    }
    if (e === '1') {
      this.inspecteurService.editInspecteur(this.inspecteur, this.user.id)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/inspecteur']));
      this.toastrService.success("Succès", "Inspecteur modifié");
    }
  }

  fermer() {
    this.windowRef.close();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  calculateUser(ev: any) {
    if (this.inspecteur.nom != undefined && this.inspecteur.prenom != undefined && this.A === 'Ajouter') {
      this.user.pseudo = this.inspecteur.prenom.substring(0, 3) + "." + this.inspecteur.nom
      this.user.mpd = this.inspecteur.nom.substring(0, 2) + String.fromCharCode(this.getRandomInt(65, 90)) + "esu" + this.getRandomInt(0, 1000) + this.inspecteur.prenom.substring(0, 2)
     // console.log(ev.target.value)
    }
  }

  calculateMail(user: User, inspecteur: Inspecteur) {
    this.mail = new Mail()
    this.mail.subject = "Compte Esurveys"
    this.mail.message = "Bonjour, Nous vous souhaitons la bienvenue à ESURVEYS.\nVotre identifiant : " + user.pseudo + " \nMot de passe pour se connecter à votre éspace : " + user.mpd +" via ce lien "+this.urlDomaine +"\nBien a vous ! \n\n\n\nN.B: Ceci est un mail automatique Merci de ne pas répondre."
    this.mail.email = inspecteur.email
    return this.mail
  }


}
