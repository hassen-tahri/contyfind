import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ChargeurService } from './chargeur.service';
import { ModalChargeurComponent } from './modal-chargeur/modal-chargeur.component';
import { ShowChargeurComponent } from './show-chargeur/show-chargeur.component';

@Component({
  selector: 'ngx-chargeur',
  templateUrl: './chargeur.component.html',
  styleUrls: ['./chargeur.component.scss']
})
export class ChargeurComponent implements OnInit {

  constructor(
    private chargeurService: ChargeurService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService) { }

  source: any;

  async ngOnInit() {
    this.source = await this.chargeurService.getAll()
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
      intitule: {
        title: 'intitule',
        type: 'text',
      },
      pays: {
        title: 'pays',
        type: 'text',
      },
    },
  }


  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalChargeurComponent, { title: 'Ajouter un chargeur' },);
  }



  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalChargeurComponent, { title: 'Modifier les informations de ce chargeur' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(ShowChargeurComponent, { title: 'Afficher les informations de ce chargeur' });
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce chargeur`)) {
      event.confirm.resolve(await this.chargeurService.deleteChargeur(event.data.id),
        this.source.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "chargeur supprimé")
      );
    } else {
      event.confirm.reject();
    }
  }

}
