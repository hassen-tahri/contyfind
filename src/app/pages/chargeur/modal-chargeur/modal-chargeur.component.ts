import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { createWorker } from "tesseract.js";
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

  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private chargeurService: ChargeurService,
    private userService: UserService) { }

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
      //user to be add
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
        }
      }
      //without user
      else { this.user.id = -1 }
      //add chargeur
      this.chargeurService.addChargeur(this.chargeur, this.user.id)
      //mailing
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/chargeur']));
      this.toastrService.success("Succès", "Chargeur ajouté");
    }
    //update
    if (e === '1') {
      if (!!await this.userService.getByPseudo(this.user.pseudo)) {
        this.toastrService.danger("Alert", "Pseudo invalide il faut le changer")
        this.editingUser = false
      }
      if (!this.haveUser && this.toBeAdd) {
        this.user.role = "chargeur"
        this.userService.addUser(this.user)
        await this.delay(1000)
        this.user = await this.userService.getByPseudo(this.user.pseudo)
      }
      else if (this.haveUser) {
        this.user = this.chargeur.user
      }
      else if (!this.toBeAdd) { this.user.id = -1 }
      this.chargeurService.editChargeur(this.chargeur, this.user.id)
      //mailing
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/chargeur']));
      this.toastrService.success("Succès", "Chargeur modifié");
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
}
