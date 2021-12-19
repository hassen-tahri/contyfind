import { Component, OnInit } from '@angular/core';
import { PortService } from './port.service';

@Component({
  selector: 'ngx-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.scss']
})
export class PortComponent implements OnInit {

  constructor(private portService: PortService) { }
  source: any
  async ngOnInit() {
    this.source = await this.portService.getAll()
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
      await this.portService.deletePort(event.data.id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  async onCreateConfirm(event) {
    this.portService.addPort(event.newData);
    setTimeout(async () => {
      this.source = await this.portService.getAll()
    }, 3000);
    event.confirm.resolve(event.newData);
  }


  async onSaveConfirm(event) {
    await this.portService.editPort(event.newData);
    event.confirm.resolve(event.newData);
  }

}
