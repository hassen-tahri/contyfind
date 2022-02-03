import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ConstatService } from '../../list-constat/constat.service';
import { ButtonDownloadConstat } from '../../list-constat/list-constat.component';
import { InspecteurService } from '../inspecteur.service';

@Component({
  selector: 'ngx-constat-inspecteur',
  templateUrl: './constat-inspecteur.component.html',
  styleUrls: ['./constat-inspecteur.component.scss']
})
export class ConstatInspecteurComponent implements OnInit {

  sourceCH : any;
  sourceDCH : any;
  inspecteurNomPrenom : any
  constructor(private windowService: NbWindowService,
    private toastrService : NbToastrService,
    private constatService : ConstatService,
    private router: Router,
    private inspecteurService : InspecteurService) { }

  async ngOnInit()  {
    let idInspecteur = localStorage.getItem("idInspecteur")
    this.sourceCH = await this.constatService.getByInspecteurCh(+idInspecteur)
    this.sourceDCH = await this.constatService.getByInspecteurDch(+idInspecteur)
    this.inspecteurNomPrenom =  (await this.inspecteurService.getById(+idInspecteur)).nom+" "+(await this.inspecteurService.getById(+idInspecteur)).prenom
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
        renderComponent: ButtonDownloadConstat,
        filter: false,
        show: false,
        addable: false,
        editable: false,
        width:'11px',
      },
    },
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
     localStorage.setItem('id' , event.data.id);
    // this.windowService.open(ShowInspecteurComponent, {title: 'Afficher les informations de cet inspecteur'});
   }
 }

 async onDeleteConfirmCh(event) {
  if (window.confirm(`Vous etes sure de supprimer cet inspecteur`)) {
    event.confirm.resolve( 
      //await this.inspecteurService.deleteInspecteur(event.data.id),
    this.sourceCH.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Inspecteur supprimé")
    );
  } else {
    event.confirm.reject();
  }
}

async onDeleteConfirmDCH(event) {
  if (window.confirm(`Vous etes sure de supprimer cet inspecteur`)) {
    event.confirm.resolve( 
      //await this.inspecteurService.deleteInspecteur(event.data.id),
    this.sourceDCH.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Inspecteur supprimé")
    );
  } else {
    event.confirm.reject();
  }
}

  redirectToConstatPage() {
    localStorage.setItem("SConstat","0")
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/constatPage']));
  }


}
