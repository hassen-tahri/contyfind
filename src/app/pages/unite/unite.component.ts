import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ModalUniteComponent } from './modal-unite/modal-unite.component';
import { ShowUniteComponent } from './show-unite/show-unite.component';
import { UniteService } from './unite.service';

@Component({
  selector: 'ngx-unite',
  templateUrl: './unite.component.html',
  styleUrls: ['./unite.component.scss']
})
export class UniteComponent implements OnInit {
  source: any
  constructor(private uniteService : UniteService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,) { }

  async ngOnInit() {
    this.source = await this.uniteService.getAll()
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
      matricule: {
        title: 'matricule',
        type: 'text',
      },
      type: {
        title: 'Categorie',
        type: 'text',
        valuePrepareFunction: (value) => { return value.intitule },
        filterFunction(obj?: any, search?: string): boolean {
          if (obj.intitule.toLowerCase().indexOf(search) > -1 || obj.intitule.toUpperCase().indexOf(search) > -1)
            return true;
          return false;
        },
      },
    }
  }

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalUniteComponent, { title: 'Ajouter unite' },
    );
  }

  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalUniteComponent, { title: 'Modifier unite' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(ShowUniteComponent, { title: 'Afficher les informations de cette unite' });
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer cette unite`)) {
      event.confirm.resolve(await this.uniteService.delete(event.data.id),
        this.source.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Unite supprimée")
      );
    } else {
      event.confirm.reject();
    }
  }

}
