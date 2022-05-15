import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { BateauService } from './bateau.service';
import { ModalBateauComponent } from './modal-bateau/modal-bateau.component';
import { ShowBateauComponent } from './show-bateau/show-bateau.component';

@Component({
  selector: 'ngx-bateau',
  templateUrl: './bateau.component.html',
  styleUrls: ['./bateau.component.scss']
})
export class BateauComponent implements OnInit {
  source: any
  constructor(private bateauService: BateauService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,) { }

  async ngOnInit() {
    this.source = await this.bateauService.getAll()
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
      matricule: {
        title: 'IMO',
        type: 'string',
      },
    }
  }

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalBateauComponent, { title: 'Ajouter un bateau' },
    );
  }

  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalBateauComponent, { title: 'Modifier ce bateau' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(ShowBateauComponent, { title: 'Afficher les informations de ce bateau' });
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce bateau`)) {
      event.confirm.resolve(await this.bateauService.deleteBateau(event.data.id),
        this.source.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Bateau supprimé")
      );
    } else {
      event.confirm.reject();
    }
  }
}
