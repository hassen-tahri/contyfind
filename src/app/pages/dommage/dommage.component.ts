import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { DommageService } from './dommage.service';
import { ModalDommageComponent } from './modal-dommage/modal-dommage.component';
import { ShowDommageComponent } from './show-dommage/show-dommage.component';

@Component({
  selector: 'ngx-dommage',
  templateUrl: './dommage.component.html',
  styleUrls: ['./dommage.component.scss']
})
export class DommageComponent implements OnInit {
  source: any
  constructor(private dommageService : DommageService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,) { }

  async ngOnInit() {
    this.source = await this.dommageService.getAll()
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
    this.windowService.open(ModalDommageComponent, { title: 'Ajouter' },
    );
  }

  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalDommageComponent, { title: 'Modifier ce dommage' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(ShowDommageComponent, { title: 'Afficher les informations de ce dommage' });
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce dommage`)) {
      event.confirm.resolve(await this.dommageService.deleteDommage(event.data.id),
        this.source.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Dommage supprimé")
      );
    } else {
      event.confirm.reject();
    }
  }

}
