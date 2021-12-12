import { Component, OnInit } from '@angular/core';
import { DommageService } from './dommage.service';

@Component({
  selector: 'ngx-dommage',
  templateUrl: './dommage.component.html',
  styleUrls: ['./dommage.component.scss']
})
export class DommageComponent implements OnInit {
  constructor(private dommageService: DommageService) { }
  source: any
  async ngOnInit() {
    this.source = await this.dommageService.getAll()
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
      await this.dommageService.deleteDommage(event.data.id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  async onCreateConfirm(event) {
    this.dommageService.addDommage(event.newData);
    setTimeout(async () => {
      this.source = await this.dommageService.getAll()
    }, 3000);
    event.confirm.resolve(event.newData);
  }


  async onSaveConfirm(event) {
    await this.dommageService.editDommage(event.newData);
    event.confirm.resolve(event.newData);
  }

}
