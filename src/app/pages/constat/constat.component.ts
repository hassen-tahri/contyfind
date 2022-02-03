import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ChargeurService } from '../chargeur/chargeur.service';
import { Inspecteur } from '../inspecteur/inspecteur';
import { InspecteurService } from '../inspecteur/inspecteur.service';
import { Constat } from '../list-constat/constat';
import { ConstatService } from '../list-constat/constat.service';
import { Bateau } from '../parametrage/bateau/bateau';
import { Port } from '../parametrage/port/port';
import { TypeService } from '../parametrage/type/type.service';
import { Voyage } from '../voyage/voyage';
import { VoyageService } from '../voyage/voyage.service';
import { ModalDommageItemComponent } from './modal-dommage-item/modal-dommage-item.component';

@Component({
  selector: 'ngx-constat',
  templateUrl: './constat.component.html',
  styleUrls: ['./constat.component.scss']
})
export class ConstatComponent implements OnInit {

  A: string
  listeVoyageNonArchive=[]
  listeType=[]
  listeChargeur=[]
  selectedVoyage : any
  selectedType : any
  selectedChargeur : any
  constat : Constat
  inspecteurCh : Inspecteur
  inspecteurDCh : Inspecteur
  voyage : Voyage
  bateau : Bateau
  portChargement : Port
  portDechargement : Port


  constructor(private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private chargeurService : ChargeurService,
    private voyageService : VoyageService,
    private typeService : TypeService,
    private inspecteurService : InspecteurService,
    private constatService : ConstatService) { }

  async ngOnInit() {
    this.constat = new Constat()
    this.inspecteurCh = new Inspecteur()
    this.inspecteurDCh = new Inspecteur()
    this.voyage = new Voyage()
    this.bateau = new Bateau()
    this.portChargement = new Port()
    this.portDechargement = new Port()
    let e = localStorage.getItem("SConstat")    
    this.listeChargeur = await this.chargeurService.getAll()
    this.listeType = await this.typeService.getAll()
    this.listeVoyageNonArchive = await this.voyageService.getByArchive(false)

    //format liste voyage
    for (let i = 0; i < this.listeVoyageNonArchive.length; i++) {
      var raw = new Date(this.listeVoyageNonArchive[i].dateChargement);
      var formatted = new DatePipe('fr').transform(raw, 'dd MMM yyyy');
      this.listeVoyageNonArchive[i].code = this.listeVoyageNonArchive[i].bateau.intitule+"  /"+formatted;
      }

    if (e === '0') { 
      this.A = 'Ajouter';
      this.constat.inspecteurChargement = this.inspecteurCh
      this.constat.inspecteurDechargement = null
      let idVoyage = localStorage.getItem("idVoyage")
      localStorage.removeItem("idVoyage")
      //ajout constat depuis la page constat/voyage 
      if(idVoyage != null)
      {this.selectedVoyage = +idVoyage
        this.calculateAttr(event)}
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id')
      this.constat = await this.constatService.getById(+id)
      this.selectedChargeur = this.constat.chargeur.id
      this.selectedVoyage = this.constat.voyage.id
      this.selectedType = this.constat.typeRemorque.id
    }
  }

  async onSave() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      console.log(this.constat)
        this.constatService.addConstat(this.constat , this.selectedVoyage , this.selectedChargeur , this.selectedType , 9 , 10)
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.toastrService.success("Succès", "Constat Ajoutée")
    } if (e === '1') {
      console.log(this.constat)
      //this.constatService.editConstat(this.constat , this.selectedVoyage , this.selectedChargeur , this.selectedType , this.inspecteurCh.id , this.inspecteurDCh.id)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.toastrService.success("Succès", "Voyage modifiée");
    }


  }

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalDommageItemComponent, { title: 'Ajouter un dommage' });
  }


   async calculateAttr(ev : any)
  { this.voyage = await this.voyageService.getById(this.selectedVoyage)
    this.bateau =  this.voyage.bateau
    this.portChargement = this.voyage.portChargement
    this.portDechargement =  this.voyage.portDechargement
    this.constat.dateChargement = new Date(this.voyage.dateChargement)
  }

  async calculateInspecteur(en: any) {
    //l'inspecteur connecté
    let insCon = localStorage.getItem("inspecteurConnecte")
    if (this.constat.etat == "Chargement") {
      this.inspecteurDCh = new Inspecteur()
      this.inspecteurCh = await this.inspecteurService.getById(+insCon)
      this.inspecteurCh.nom = this.inspecteurCh.nom + " " + this.inspecteurCh.prenom
      
    }
    if (this.constat.etat == "Déchargement") {
      this.inspecteurCh = new Inspecteur()
      this.inspecteurDCh = await this.inspecteurService.getById(+insCon)
      this.inspecteurDCh.nom = this.inspecteurDCh.nom + " " + this.inspecteurDCh.prenom
      
    }
  }

}
