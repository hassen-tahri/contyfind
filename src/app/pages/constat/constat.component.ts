import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { Bateau } from '../bateau/bateau';
import { ChargeurService } from '../chargeur/chargeur.service';
import { Inspecteur } from '../inspecteur/inspecteur';
import { InspecteurService } from '../inspecteur/inspecteur.service';
import { Constat } from '../list-constat/constat';
import { ConstatService } from '../list-constat/constat.service';
import { Port } from '../port/port';
import { TypeService } from '../type/type.service';
import { Unite } from '../unite/unite';
import { UniteService } from '../unite/unite.service';
import { Voyage } from '../voyage/voyage';
import { VoyageService } from '../voyage/voyage.service';
import { ModalDommageItemComponent } from './modal-dommage-item/modal-dommage-item.component';
import { ModalImageComponent } from './modal-image/modal-image.component';

@Component({
  selector: 'ngx-constat',
  templateUrl: './constat.component.html',
  styleUrls: ['./constat.component.scss']
})
export class ConstatComponent implements OnInit {

  A: string
  listeVoyageNonArchive=[]
  listeUnite=[]
  listeType=[]
  listeChargeur=[]
  selectedVoyage : any
  selectedUnite : any
  selectedChargeur : any
  selectedType : any
  constat : Constat
  inspecteurCh : Inspecteur
  inspecteurDCh : Inspecteur
  voyage : Voyage
  bateau : Bateau
  portChargement : Port
  portDechargement : Port
  isNewType : boolean
  disabledTypeInput


  constructor(private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private chargeurService : ChargeurService,
    private voyageService : VoyageService,
    private typeService : TypeService,
    private inspecteurService : InspecteurService,
    private constatService : ConstatService,
    private uniteService : UniteService) { }

  async ngOnInit() {
    this.disabledTypeInput = false
    this.constat = new Constat()
    this.inspecteurCh = new Inspecteur()
    this.inspecteurDCh = new Inspecteur()
    this.voyage = new Voyage()
    this.bateau = new Bateau()
    this.portChargement = new Port()
    this.portDechargement = new Port()
    let e = localStorage.getItem("EstorageConstat")    
    this.listeChargeur = await this.chargeurService.getAll()
    this.listeType = await this.typeService.getAll()
    this.listeUnite = await this.uniteService.getAll()
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
      this.selectedUnite = this.constat.unite.id
    }
  }

  async onSave() {
    let e = localStorage.getItem('e');
    if (e === '0') {
       await this.constatService.addConstat(this.constat , this.selectedVoyage,this.selectedChargeur,this.selectedUnite, null ,null)
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        console.log(this.constat)
        this.toastrService.success("Succès", "Constat Ajoutée")
    } if (e === '1') {
      console.log(this.constat)
      await this.constatService.editConstat(this.constat , this.selectedVoyage,this.selectedChargeur,this.selectedUnite, this.inspecteurCh.id ,this.inspecteurDCh.id)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.toastrService.success("Succès", "Voyage modifiée");
    }


  }

  openWindowDommage() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    localStorage.setItem("constatCourant", this.constat.id.toString())
    this.windowService.open(ModalDommageItemComponent, { title: 'Ajouter un dommage' });
  }


   async calculateAttr(ev : any)
   
  { 
    this.voyage = await this.voyageService.getById(this.selectedVoyage)
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

  async changeType(en: any){
  if(!this.isNewType && this.selectedUnite != null)
  {this.selectedType = (await (this.uniteService.getById(this.selectedUnite))).type.id
    this.disabledTypeInput = true}
  
  }

  openWindowImage() {
   //localStorage.removeItem('e');
   //localStorage.removeItem('id');
   // localStorage.setItem('e', '0');
   //localStorage.setItem("constatCourant", this.constat.id.toString())
    this.windowService.open(ModalImageComponent, { title: 'Ajouter une image' });
  }

  addNewUnite = (term) => {
    this.selectedUnite = new Unite()
    this.selectedUnite.matricule = term
    if(!!this.selectedType)
    {this.disabledTypeInput = false
      this.uniteService.add(this.selectedUnite, this.selectedType)}
      this.isNewType = true
    console.log("new type "+this.isNewType)
    console.log("disabled "+this.disabledTypeInput) 
    
    return ({ matricule: term, type: this.selectedType, });
  };

}
