import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { DommageService } from '../../dommage/dommage.service';
import { DommageItem } from './dommage-item';
import { DommageItemService } from './dommage-item.service';

@Component({
  selector: 'ngx-modal-dommage-item',
  templateUrl: './modal-dommage-item.component.html',
  styleUrls: ['./modal-dommage-item.component.scss']
})
export class ModalDommageItemComponent implements OnInit {
  descriptionList: any
  selectedDescription: number
  dommageItem: DommageItem
  selectedDommage
  A: string
  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private dommageDescService: DommageService,
    private dommageItemService: DommageItemService) { }

  //for test
  dommageDesc: any
  dommageNgModel: any
  dommages = [
    { id: 'CR', name: 'CR' },
    { id: 'DF', name: 'DF' },
    { id: 'CS', name: 'CS' },
    { id: 'CP', name: 'CP' },
    { id: 'MA', name: 'MA' },
    { id: 'RG', name: 'RG' },
    { id: 'FR', name: 'FR' },
    { id: 'DH', name: 'DH' },
    { id: 'PF', name: 'PF' },
    { id: 'RAP', name: 'RAP' },
    { id: 'DG/DF', name: 'DG/DF' },
  ];


  detail: any
  detailNgModel: any
  details = [
    { id: 'Supérieur', name: 'Supérieur' },
    { id: 'Inférieur', name: 'Inférieur' },
    { id: 'Avant', name: 'Avant' },
    { id: 'Arrière', name: 'Arrière' },
    { id: 'Latéral', name: 'Latéral' },
  ];

  addCustomUser = (term) => ({ id: term, name: term });


  async ngOnInit() {
    this.dommageItem = new DommageItem()
    this.descriptionList = await this.dommageDescService.getAll()
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.dommageItem = await this.dommageItemService.getById(+id)
      this.detailNgModel = this.dommageItem.detail
      this.dommageNgModel = this.dommageItem.dommageValue 
      this.selectedDescription = this.dommageItem.dommage.id
    }
  }

  fermer() {
    this.windowRef.close();
  }

  async onSave() {
    let e = localStorage.getItem('e');
    let phase = localStorage.getItem("phase")
    let idC = localStorage.getItem("ccId")
    if (e === '0') {
      this.dommageItem.phase = phase
      this.dommageItem.detail = this.detailNgModel
      this.dommageItem.dommageValue = this.dommageNgModel
     // console.log(idC)
      this.dommageItemService.add(this.dommageItem, this.selectedDescription, +idC)
     // console.log(this.dommageItem)
      localStorage.removeItem('e');
      localStorage.removeItem("ccId");
      localStorage.removeItem("phase")
      this.windowRef.close();
      this.toastrService.success("Succès", "dommage ajouté");
    }
    if (e === '1') {
      this.dommageItem.phase = phase
      this.dommageItem.detail = this.detailNgModel
      this.dommageItem.dommageValue = this.dommageNgModel
      this.dommageItemService.edit(this.dommageItem, this.dommageItem.dommage.id , +idC)
      localStorage.removeItem('e');
      localStorage.removeItem("ccId");
      this.windowRef.close();
      this.toastrService.success("Succès", "dommage modifé");
    }


  }
}
