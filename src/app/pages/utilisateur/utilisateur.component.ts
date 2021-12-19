import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'ngx-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  constructor(private userService: UserService) { }
  source: any
  async ngOnInit() {
    this.source = await this.userService.getAll()
  }


  settings = {
    noDataMessage: "vide",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      pseudo: {
        title: 'Pseudo',
        type: 'string',
      },

      mpd: {
        title: 'Mot de passe',
        type: 'string',
      },
      role: {
        title: 'Role',
        filter: {
          type: 'list',
          config: {
            selectText: 'Role',
            list: [
              { value: 'admin', title: 'administrateur' },
              { value: 'inspecteur', title: 'Inspecteur' },
              { value: 'chargeur', title: 'Chargeur' }
          ],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'admin', title: 'Administrateur' },
              { value: 'inspecteur', title: 'Inspecteur' },
              { value: 'chargeur', title: 'Chargeur' }
            ],
          },
        },
        type: 'string',
      },
    }
  }

  async onDeleteConfirm(event) {
    //la suppression du user par defaut 
    // if (event.data.pseudo === "adminfcit") {
    //   window.confirm("vous ne pouvez pas supprimer cet utilisateur par defaut"),
    //   event.confirm.reject();
    // }
    //else 
    if (window.confirm('Etes-vous sûr que vous voulez supprimer !')) {
      await this.userService.deleteUser(event.data.id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  async onCreateConfirm(event) {
    // if (event.newData.pseudo === "adminfcit") {
    //   window.confirm("Le pseudo ''adminfcit'' est reservé pour l'utilisateur par defaut"),
    //     event.confirm.reject();
    // }
    // else {
    this.userService.addUser(event.newData);
    setTimeout(async () => {
      this.source = await this.userService.getAll()
    }, 3000);
    event.confirm.resolve(event.newData);
  }

  async onSaveConfirm(event) {
    // if (event.data.pseudo === "adminfcit") {
    //   window.confirm("Vous ne pouvez pas modifier cet utilisateur par defaut"),
    //     event.confirm.reject();
    // }
    // else {
      await this.userService.editUser(event.newData);
      event.confirm.resolve(event.newData);
  }

}
