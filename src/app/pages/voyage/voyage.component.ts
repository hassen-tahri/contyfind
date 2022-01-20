import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { ModalVoyageComponent } from './modal-voyage/modal-voyage.component';
import { ShowVoyageComponent } from './show-voyage/show-voyage.component';
import { VoyageService } from './voyage.service';



@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="container-btn">' +
    '<button nbButton status="info"><nb-icon icon="file-text-outline"></nb-icon></button>' +
    '</div>',

})
export class ButtonViewConstatVoyage implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();

  }
  constructor(private router: Router) {
  }
  onClick() {
  }
}


@Component({
  selector: 'ngx-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.scss']
})
export class VoyageComponent implements OnInit {

  constructor(private voyageService: VoyageService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private router: Router) { }

  listeVoyage: any;
  async ngOnInit() {
    this.listeVoyage = await this.voyageService.getAll()
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
      code: {
        title: 'Code',
        type: 'text',
      },
      etat: {
        title: 'Etat',
        type: 'text',
      },
      constat: {
        title: '',
        type: 'custom',
        renderComponent: ButtonViewConstatVoyage,
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
    this.windowService.open(ModalVoyageComponent, { title: 'Ajouter un voyage' },);
  }



  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalVoyageComponent, { title: 'Modifier les informations de ce voyage' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(ShowVoyageComponent, { title: 'Afficher les informations de ce voyage' });
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce voyage`)) {
      event.confirm.resolve(await this.voyageService.deleteById(event.data.id),
        this.listeVoyage.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Voyage supprimé")
      );
    } else {
      event.confirm.reject();
    }
  }

  async onDeleteById(id: number, event) {
    if (window.confirm(`Vous etes sure de supprimer ce voyage`)) {
      await this.voyageService.deleteById(id)
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/voyage']))
      this.toastrService.warning("Succès", "Voyage supprimé");
    } else {
      event.confirm.reject();
    }
  }

  onEditById(id : number){
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('id', "6");
    localStorage.setItem('e', '1');
    this.windowService.open(ModalVoyageComponent, { title: 'Modifier les informations de ce voyage' });
  }


  }

