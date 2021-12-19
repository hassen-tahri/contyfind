import { Component, OnInit } from '@angular/core';
import { BateauService } from './bateau.service';

@Component({
  selector: 'ngx-bateau',
  templateUrl: './bateau.component.html',
  styleUrls: ['./bateau.component.scss']
})
export class BateauComponent implements OnInit {
  source: any
  constructor(private bateauService: BateauService) { }

  async ngOnInit() {
    this.source = await this.bateauService.getAll()
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
    // actions: {
    //   delete: !this.IsUser(), 
    // },
    columns: {
      intitule: {
        title: 'intitule',
        type: 'string',
      },
      matricule: {
        title: 'matricule',
        type: 'string',
      },
    }
  }


  async onDeleteConfirm(event) {
    if (window.confirm('Etes-vous sûr que vous voulez supprimer !')) {
      await this.bateauService.deleteBateau(event.data.id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  async onCreateConfirm(event) {
    this.bateauService.addBateau(event.newData);
    setTimeout(async () => {
      this.source = await this.bateauService.getAll()
    }, 3000);
    event.confirm.resolve(event.newData);
  }


  async onSaveConfirm(event) {
    await this.bateauService.editBateau(event.newData);
    event.confirm.resolve(event.newData);
  }


}
