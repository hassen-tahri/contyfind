import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { InspecteurService } from './inspecteur.service';
import { ModalInspecteurComponent } from './modal-inspecteur/modal-inspecteur.component';
import { ShowInspecteurComponent } from './show-inspecteur/show-inspecteur.component';

@Component({
  selector: 'ngx-inspecteur',
  templateUrl: './inspecteur.component.html',
  styleUrls: ['./inspecteur.component.scss']
})
export class InspecteurComponent implements OnInit {

  constructor(private inspecteurService : InspecteurService,
    private windowService: NbWindowService,
    private toastrService : NbToastrService) { }

  source : any;
  async ngOnInit() {
    this.source = await this.inspecteurService.getAll()
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
      nom: {
        title: 'Nom',
        type: 'text',
      },
      prenom: {
        title: 'Prenom',
        type: 'text',
      },
    },
  }


  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalInspecteurComponent, {title: 'Ajouter un inspecteur'},);
  }



  onCostum(event) :any {
    if (event.action === 'editAction') {
   localStorage.removeItem('e');
   localStorage.removeItem('id');
   localStorage.setItem('id' , event.data.id);
   localStorage.setItem('e', '1');
   this.windowService.open(ModalInspecteurComponent, {title: 'Modifier les informations de cet inspecteur'});
   }
   if (event.action === 'showAction') {
     localStorage.removeItem('e');
     localStorage.removeItem('id');
     localStorage.setItem('id' , event.data.id);
     this.windowService.open(ShowInspecteurComponent, {title: 'Afficher les informations de cet inspecteur'});
   }
 }

 async onDeleteConfirm(event) {
  if (window.confirm(`Vous etes sure de supprimer cet inspecteur`)) {
    event.confirm.resolve( await this.inspecteurService.deleteInspecteur(event.data.id),
    this.source.filter(p => p !== event.data),
    this.toastrService.warning("Succès","Inspecteur supprimé")
    );
  } else {
    event.confirm.reject();
  }
}
  
}
