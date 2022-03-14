import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ModalTypeComponent } from './modal-type/modal-type.component';
import { ShowModalComponent } from './show-modal/show-modal.component';
import { TypeService } from './type.service';

@Component({
  selector: 'ngx-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  source: any
  constructor(private typeService: TypeService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,) { }

  async ngOnInit() {
    this.source = await this.typeService.getAll()
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
      ],

    },
    columns: {
      intitule: {
        title: 'intitule',
        type: 'string',
      },
    }
  }

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalTypeComponent, { title: 'Ajouter une categorie' },
    );
  }

  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalTypeComponent, { title: 'Modifier cette categorie' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(ShowModalComponent, { title: 'Afficher les informations de cette categorie' });
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce categorie`)) {
      event.confirm.resolve(await this.typeService.deleteType(event.data.id),
        this.source.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Categorie supprimée")
      );
    } else {
      event.confirm.reject();
    }
  }

}
