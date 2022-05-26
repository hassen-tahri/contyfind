import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ModalPortComponent } from './modal-port/modal-port.component';
import { PortService } from './port.service';
import { ShowPortComponent } from './show-port/show-port.component';

@Component({
  selector: 'ngx-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.scss']
})
export class PortComponent implements OnInit {
  source: any
  constructor(private portService: PortService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,) { }

  async ngOnInit() {
    this.source = await this.portService.getAll()
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
    this.windowService.open(ModalPortComponent, { title: 'Ajouter' },
    );
  }

  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalPortComponent, { title: 'Modifier ce port' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(ShowPortComponent, { title: 'Afficher les informations de ce port' });
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce port`)) {
      event.confirm.resolve(await this.portService.deletePort(event.data.id),
        this.source.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Port supprimé")
      );
    } else {
      event.confirm.reject();
    }
  }
}
