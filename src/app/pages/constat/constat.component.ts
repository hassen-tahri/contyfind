import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { Bateau } from '../bateau/bateau';
import { ChargeurService } from '../chargeur/chargeur.service';
import { Inspecteur } from '../inspecteur/inspecteur';
import { InspecteurService } from '../inspecteur/inspecteur.service';
import { Constat } from '../list-constat/constat';
import { ConstatService } from '../list-constat/constat.service';
import { PagesComponent } from '../pages.component';
import { PdfTemplateService } from '../pdf-page-creator/pdf-template.service';
import { Port } from '../port/port';
import { TypeService } from '../type/type.service';
import { Unite } from '../unite/unite';
import { UniteService } from '../unite/unite.service';
import { User } from '../utilisateur/user';
import { UserService } from '../utilisateur/user.service';
import { Voyage } from '../voyage/voyage';
import { VoyageService } from '../voyage/voyage.service';
import { DommageItemService } from './modal-dommage-item/dommage-item.service';
import { ModalDommageItemComponent } from './modal-dommage-item/modal-dommage-item.component';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { ShowDommageItemComponent } from './show-dommage-item/show-dommage-item.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PagePdfViewrComponent } from '../page-pdf-viewr/page-pdf-viewr.component';

@Component({
  selector: 'ngx-constat',
  templateUrl: './constat.component.html',
  styleUrls: ['./constat.component.scss']
})
export class ConstatComponent implements OnInit {

  A: string
  listeVoyageNonArchive = []
  listeUnite = []
  listeType = []
  listeChargeur = []
  listDommageItemChargement: any
  listDommageItemDeChargement: any
  selectedVoyage: any
  selectedUnite: any
  selectedNewUniteObject: any
  selectedChargeur: any
  selectedType: any
  constat: Constat
  inspecteurCh: Inspecteur
  inspecteurDCh: Inspecteur
  voyage: Voyage
  bateau: Bateau
  portChargement: Port
  portDechargement: Port
  isNewType: boolean
  disabledTypeInput
  isSaved = false
  user: User
  flipped: boolean;
  phase: string
  pdftoShow: any




  constructor(private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private chargeurService: ChargeurService,
    private voyageService: VoyageService,
    private typeService: TypeService,
    private inspecteurService: InspecteurService,
    private constatService: ConstatService,
    private uniteService: UniteService,
    private userService: UserService,
    private dommageItemService: DommageItemService,
    private pdfTemplate: PdfTemplateService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

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
    localStorage.removeItem("phase")





    //format liste voyage
    for (let i = 0; i < this.listeVoyageNonArchive.length; i++) {
      var raw = new Date(this.listeVoyageNonArchive[i].dateChargement);
      var formatted = new DatePipe('fr').transform(raw, 'dd MMM yyyy');
      this.listeVoyageNonArchive[i].code = this.listeVoyageNonArchive[i].bateau.intitule + "  /" + formatted;
    }

    if (e === '0') {
      this.A = 'Suivant';
      this.constat.inspecteurChargement = this.inspecteurCh
      this.constat.inspecteurDechargement = null
      let idVoyage = localStorage.getItem("idVoyage")
      localStorage.removeItem("idVoyage")

      //phase constat
      this.phase = "chargement"
      localStorage.setItem("phase", "chargement")
      this.calculateInspecteur()
      //console.log(this.phase)

      //ajout constat depuis la page constat/voyage 
      if (idVoyage != null) {
        this.selectedVoyage = +idVoyage
        this.calculateAttr(event)
      }
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

  //smart table dommage
  settings = {
    noDataMessage: "vide",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 8,
    },
    actions: {
      position: 'right',
      width: "115px",
      add: false,
      edit: false,
      delete: true,
      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',
        },
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Show"></i>',
        },
      ],
    },
    columns: {
      dommage: {
        title: 'Description',
        type: 'text',
        valuePrepareFunction: (value) => { return value.intitule },
        filterFunction(obj?: any, search?: string): boolean {
          if (obj.intitule.toLowerCase().indexOf(search) > -1 || obj.intitule.toUpperCase().indexOf(search) > -1)
            return true;
          return false;
        },
      },
    },
  }




  filpCalculatePhase() {
    this.flipped = !this.flipped;
    if (!this.flipped) {
      localStorage.removeItem("phase")
      localStorage.setItem("phase", "chargement")
      this.phase = "chargement"
    }
    if (this.flipped) {
      localStorage.removeItem("phase")
      localStorage.setItem("phase", "dechargement")
      this.phase = "dechargement"
    }
    //console.log(this.phase)
  }

  async onSave() {
    let e = localStorage.getItem('EstorageConstat');
    if (e === '0') {
      this.A = "Enregistrer"
      this.isSaved = true
      this.constat.etat = "new"
      this.calculateInspecteur()
      let uniteToInsert
      if (this.isNewType) { uniteToInsert = this.selectedNewUniteObject.id 
        this.isNewType = false}
      else {
        uniteToInsert = this.selectedUnite
      }
      this.constat = await this.constatService.addConstat(this.constat, this.selectedVoyage, this.selectedChargeur, uniteToInsert , this.inspecteurCh.id, this.inspecteurDCh.id)
      localStorage.setItem("ccId", this.constat.id.toString())
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.toastrService.success("Succès", "Constat Ajoutée")
    } if (e === '1') {
      // console.log(this.constat)
      // await this.constatService.editConstat(this.constat, this.selectedVoyage, this.selectedChargeur, this.selectedUnite, this.inspecteurCh.id, this.inspecteurDCh.id)
      // localStorage.removeItem('e');
      // localStorage.removeItem('id');
      // this.toastrService.success("Succès", "Voyage modifiée");
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce dommage`)) {
      event.confirm.resolve(await this.dommageItemService.delete(event.data.id),
        this.listDommageItemChargement.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Dommage supprimé")
      );
    } else {
      event.confirm.reject();
    }
  }

  async openWindowDommage(event) {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalDommageItemComponent, { title: 'Ajouter un dommage' });
  }

  async reloadTable(event) {
    this.listDommageItemChargement = await this.dommageItemService.getByConstatIdAndPhase(this.constat.id, "chargement")
    this.listDommageItemChargement.filter(p => p !== event.data)
  }

  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalDommageItemComponent, { title: 'Modifier ce dommage' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(ShowDommageItemComponent, { title: 'Afficher les informations de ce voyage' });
    }
  }


  async calculateAttr(ev: any) {
    this.voyage = await this.voyageService.getById(this.selectedVoyage)
    this.bateau = this.voyage.bateau
    this.portChargement = this.voyage.portChargement
    this.portDechargement = this.voyage.portDechargement
    this.constat.dateChargement = new Date(this.voyage.dateChargement)
  }

  async calculateInspecteur() {
    if (this.phase == "chargement") {
      this.inspecteurDCh = new Inspecteur()
      this.inspecteurDCh.id = -1
      this.inspecteurCh = await this.inspecteurService.getByUserId(+localStorage.getItem(PagesComponent.userId))
      this.inspecteurCh.nom = this.inspecteurCh.nom + " " + this.inspecteurCh.prenom
      //console.log("chargemtent " + this.inspecteurCh.nom)
    }
    if (this.phase == "dechargement") {
      this.inspecteurCh = new Inspecteur()
      this.inspecteurCh.id = -1
      this.inspecteurDCh = await this.inspecteurService.getByUserId(+localStorage.getItem(PagesComponent.userId))
      this.inspecteurDCh.nom = this.inspecteurDCh.nom + " " + this.inspecteurDCh.prenom
      //console.log("dechargement " + this.inspecteurDCh.nom)
    }
  }

  async changeType(en: any) {
    if (!this.isNewType && this.selectedUnite != null) {
      this.selectedType = (await (this.uniteService.getById(this.selectedUnite))).type.id
      this.disabledTypeInput = true
    }

  }

  openWindowImage() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    localStorage.setItem("constatCourant", this.constat.id.toString())
    this.windowService.open(ModalImageComponent, { title: 'Ajouter une image' });
  }

  addNewUnite = async (term) => {
    this.selectedNewUniteObject = new Unite()
    this.selectedNewUniteObject.matricule = term
    if (!!this.selectedType) {
      this.disabledTypeInput = false
      this.selectedNewUniteObject = await this.uniteService.add(this.selectedNewUniteObject, this.selectedType)
    }
    this.isNewType = true
    // alert add
    //console.log("new type " + this.isNewType)
    //console.log("disabled " + this.disabledTypeInput)
    return ({ matricule: term, type: this.selectedType, });
  };

  async viewPdf() {
    localStorage.removeItem('id');
    localStorage.setItem('id', this.constat.id.toString());
    this.windowService.open(PagePdfViewrComponent, { title: 'pdf constat' });
  }

  async downloadPdf() {
    const documentDefinition = await this.pdfTemplate.getDocumentDefinition(this.constat);
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition).open();
  }

}
