import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { Bateau } from '../../bateau/bateau';
import { ConstatService } from '../../list-constat/constat.service';
import { PagePdfViewrComponent } from '../../page-pdf-viewr/page-pdf-viewr.component';
import { PdfPageCreatorComponent } from '../../pdf-page-creator/pdf-page-creator.component';
import { Voyage } from '../voyage';
import { VoyageService } from '../voyage.service';

@Component({
  selector: 'ngx-constat-voyage',
  templateUrl: './constat-voyage.component.html',
  styleUrls: ['./constat-voyage.component.scss']
})
export class ConstatVoyageComponent implements OnInit {


  source : any;
  voyage : Voyage;
  bateau : Bateau
  
  //steper
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  stepperIndex : number;
  completed1 : boolean 
  completed2 : boolean
  completed3 : boolean

  constructor(private windowService: NbWindowService,
    private toastrService : NbToastrService,
    private constatService : ConstatService,
    private router: Router,
    private votageService : VoyageService,
    private fb: FormBuilder,) { }

  
  async ngOnInit() {
    this.voyage = new Voyage()
    this.bateau = new Bateau()
    let idVoyage = localStorage.getItem("idVoyage")
    this.source = await this.constatService.getByVoyage(+idVoyage)
    this.voyage = await this.votageService.getById(+idVoyage)
    this.bateau = this.voyage.bateau



    //step
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
    if (this.voyage.etat === "Chargement")
    {this.firstForm.markAsDirty();
    this.stepperIndex = 1
    this.completed1 = true
    this.completed2 = false
    this.completed3 = false}
    if(this.voyage.etat ==="En cours")
    { 
      this.secondForm.markAsDirty();
      this.stepperIndex = 2
      this.completed1 = true
      this.completed2 = true
      this.completed3 = false}
    if(this.voyage.etat === "Dechargement")
    {
      this.thirdForm.markAsDirty();
      this.stepperIndex = 3
      this.completed1 = true
      this.completed2 = true
      this.completed3 = true}
    }

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
      id: {
        title: 'id',
        type: 'text',
      },
      remorqueCode: {
        title: 'remorque',
        type: 'text',
      },
      constat: {
        title: '',
        type: 'custom',
        renderComponent: PdfPageCreatorComponent,
        filter: false,
        show: false,
        addable: false,
        editable: false,
        width:'11px',
      },
    },
  }


  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    //this.windowService.open(ModalInspecteurComponent, {title: 'Ajouter un inspecteur'},);
  }



  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
  // this.windowService.open(ModalInspecteurComponent, {title: 'Modifier les informations de cet inspecteur'});
   }
   if (event.action === 'showAction') {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('id', event.data.id);
    this.windowService.open(PagePdfViewrComponent, { title: 'pdf constat' });
   }
 }

 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer cet inspecteur`)) {
    event.confirm.resolve( 
      //await this.inspecteurService.deleteInspecteur(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Inspecteur supprimé")
    );
  } else {
    event.confirm.reject();
  }
}

  redirectToConstatPage() {
    localStorage.setItem("EstorageConstat","0")
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/constatPage']));
  }


}
