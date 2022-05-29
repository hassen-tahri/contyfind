import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { DommageItem } from '../modal-dommage-item/dommage-item';
import { DommageItemService } from '../modal-dommage-item/dommage-item.service';

@Component({
  selector: 'ngx-show-dommage-item',
  templateUrl: './show-dommage-item.component.html',
  styleUrls: ['./show-dommage-item.component.scss']
})
export class ShowDommageItemComponent implements OnInit {

  constructor(private dommageItemService : DommageItemService,
    public windowRef: NbWindowRef) { }

  dommageItem : DommageItem
  desciption : any

 async ngOnInit() {
    this.dommageItem = new DommageItem()
    let id = localStorage.getItem('id');
    this.dommageItem =  await this.dommageItemService.getById(+id)
    this.desciption = this.dommageItem.dommage.intitule
   // console.log(this.dommageItem)
  }

  fermer() {
    this.windowRef.close();
  }

}
