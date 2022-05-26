import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { UserService } from '../utilisateur/user.service';
import { Chargeur } from './chargeur';
import { ChargeurService } from './chargeur.service';
import { ModalChargeurComponent } from './modal-chargeur/modal-chargeur.component';
import { ShowChargeurComponent } from './show-chargeur/show-chargeur.component';

@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="container-btn">' +
    '<button nbButton hero status="info" (click)="onClick()"><nb-icon icon="file-text-outline"></nb-icon></button>' +
    '</div>',

})
export class ButtonViewConstatChargeur implements ViewCell, OnInit {
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
    localStorage.setItem('idChargeur', this.rowData.id);
    this.router.navigate(['/pages/constat/chargeur']);
  }
}

@Component({
  selector: 'ngx-chargeur',
  templateUrl: './chargeur.component.html',
  styleUrls: ['./chargeur.component.scss']
})
export class ChargeurComponent implements OnInit {

  constructor(
    private chargeurService: ChargeurService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private userService : UserService) { }

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
      user: {
        title: "Compte",
        type: "html",
        width:'11px',
        filter : false,
        valuePrepareFunction: (user) =>{
          if(user != null)
          {return '<span class="caption status-success"><b>✔</b></span>'}
          else 
          {return '<span class="caption status-danger"><b>X</b></span>'}
        },
      },
      constat: {
        title: '',
        type: 'custom',
        renderComponent: ButtonViewConstatChargeur,
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
    this.windowService.open(ModalChargeurComponent, { title: 'Ajouter' },);
  }



  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalChargeurComponent, { title: 'Modifier hargeur' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(ShowChargeurComponent, { title: 'Afficher chargeur' });
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce chargeur`)) {
      event.confirm.resolve(
        this.deleteIfUser(event.data),
        await this.chargeurService.deleteChargeur(event.data.id),
        this.source.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "chargeur supprimé")
      );
    } else {
      event.confirm.reject();
    }
  }

  async deleteIfUser(chargeur: Chargeur) {
    if (chargeur.user) { await this.userService.deleteUser(chargeur.user.id) }
  }

}
