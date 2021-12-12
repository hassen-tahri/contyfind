import { Component, OnInit } from '@angular/core';
import { TypeService } from './type.service';

@Component({
  selector: 'ngx-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  constructor(private typeService: TypeService) { }
  source: any
  async ngOnInit() {
    this.source = await this.typeService.getAll()
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
    }
  }


  async onDeleteConfirm(event) {
    if (window.confirm('Etes-vous sûr que vous voulez supprimer !')) {
      await this.typeService.deleteType(event.data.id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  async onCreateConfirm(event) {
    this.typeService.addType(event.newData);
    setTimeout(async () => {
      this.source = await this.typeService.getAll()
    }, 3000);
    event.confirm.resolve(event.newData);
  }


  async onSaveConfirm(event) {
    await this.typeService.editType(event.newData);
    event.confirm.resolve(event.newData);
  }
}
