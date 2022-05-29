import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { createWorker } from "tesseract.js";
import { runInThisContext } from 'vm';
import { Mail } from '../../mailing/mail';
import { MailService } from '../../mailing/mail.service';
import { PagesComponent } from '../../pages.component';
import { User } from '../../utilisateur/user';
import { UserService } from '../../utilisateur/user.service';
import { Chargeur } from '../chargeur';
import { ChargeurService } from '../chargeur.service';

@Component({
  selector: 'ngx-modal-chargeur',
  templateUrl: './modal-chargeur.component.html',
  styleUrls: ['./modal-chargeur.component.scss']
})
export class ModalChargeurComponent implements OnInit {

  A: string
  chargeur: Chargeur
  user: User
  toBeAdd: boolean
  checked: any
  editingUser: boolean
  haveUser: boolean
  mail: Mail
  urlDomaine = PagesComponent.urlDomaine

  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private chargeurService: ChargeurService,
    private userService: UserService,
    private mailService: MailService) { }

  async ngOnInit() {
    this.haveUser = false
    this.editingUser = true
    let e = localStorage.getItem('e');
    this.user = new User()
    this.chargeur = new Chargeur()
    if (e === '0') {
      this.A = 'Ajouter';
      this.haveUser = false
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.chargeur = await this.chargeurService.getById(+id)
      if (this.chargeur.user == null) {
        this.user = new User()
        this.haveUser = false
      }
      else {
        this.user = this.chargeur.user
        this.haveUser = true
      }
    }
  }

  fermer() {
    this.windowRef.close();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onAddChargeur() {
    let e = localStorage.getItem('e');
    //add
    if (e === '0') {
      if (this.toBeAdd) {
        this.user.role = "chargeur"
        if (!!await this.userService.getByPseudo(this.user.pseudo)) {
          this.toastrService.danger("Alert", "Pseudo invalide il faut le changer")
          this.editingUser = false
        }
        else {
          this.userService.addUser(this.user)
          await this.delay(1000)
          this.user = await this.userService.getByPseudo(this.user.pseudo)
          this.chargeurService.addChargeur(this.chargeur, this.user.id)
          this.mail = this.calculateMail(this.user, this.chargeur)
          this.mailService.sendMail(this.mail)
          localStorage.removeItem('e');
          localStorage.removeItem('id');
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages/esurveys']));
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/pages/chargeur']));
          this.toastrService.success("Succès", "Chargeur ajouté");
        }
      }
      else {
        this.user = await this.userService.getByPseudo(this.user.pseudo)
        this.chargeurService.addChargeur(this.chargeur, -1)
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/esurveys']));
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages/chargeur']));
        this.toastrService.success("Succès", "Chargeur ajouté");
      }
    }
    //update
    if (e === '1') {
      //ken 3andou user
      if (this.haveUser) {
        this.editingUser = true
        this.chargeurService.editChargeur(this.chargeur, this.user.id)
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages/chargeur']));
        this.toastrService.success("Succès", "Chargeur modifié");
      }//ken bech izid user
      else if (!this.haveUser && this.toBeAdd) {
        if (!!await this.userService.getByPseudo(this.user.pseudo)) {
          this.toastrService.danger("Alert", "Pseudo invalide il faut le changer")
          this.editingUser = false
        }
        else {
          this.user.role = "chargeur"
          this.userService.addUser(this.user)
          await this.delay(1000)
          this.user = await this.userService.getByPseudo(this.user.pseudo)
          this.chargeurService.editChargeur(this.chargeur, this.user.id)
          this.mail = this.calculateMail(this.user, this.chargeur)
          this.mailService.sendMail(this.mail)
          localStorage.removeItem('e');
          localStorage.removeItem('id');
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/pages/chargeur']));
          this.toastrService.success("Succès", "Chargeur modifié");
        }
      }
      // ken bech ibadel ou yo93ed blech user
      else if (!this.haveUser && !this.toBeAdd) {
        this.chargeurService.editChargeur(this.chargeur, -1)
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages/chargeur']));
        this.toastrService.success("Succès", "Chargeur modifié");
      }
    }
  }

  userToBeAdd(checked) {
    this.checked = checked.target.checked; // your variable
    if (this.checked) {
      this.toBeAdd = true
      this.calculateUser(event)
    }
    else {
      this.toBeAdd = false
      //console.log(this.myFormattedDate)
    }
  }

  calculateUser(ev: any) {
    if (this.chargeur.intitule != undefined && this.chargeur.pays != undefined && !this.haveUser) {
      this.user.pseudo = this.chargeur.intitule.substring(0, 3) + "." + this.chargeur.pays
      this.user.mpd = this.chargeur.intitule.substring(0, 2) + String.fromCharCode(this.getRandomInt(65, 90)) + "esu" + this.getRandomInt(0, 1000) + this.chargeur.pays.substring(0, 2)
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


  calculateMail(user: User, chargeur: Chargeur) {
    this.mail = new Mail()
    this.mail.subject = "Compte Esurveys"
    this.mail.message = "Bonjour, Nous vous souhaitons la bienvenue à ESURVEYS.\nVotre identifiant : " + user.pseudo + " \nMot de passe pour se connecter à votre éspace : " + user.mpd +" via ce lien "+this.urlDomaine +"\nBien a vous ! \n\n\n\nN.B: Ceci est un mail automatique Merci de ne pas répondre."
    this.mail.email = chargeur.email
    return this.mail
  }
}
