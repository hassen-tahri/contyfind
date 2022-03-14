import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { DommageService } from '../../dommage/dommage.service';

@Component({
  selector: 'ngx-modal-dommage-item',
  templateUrl: './modal-dommage-item.component.html',
  styleUrls: ['./modal-dommage-item.component.scss']
})
export class ModalDommageItemComponent implements OnInit {

  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private dommageDescService : DommageService) { }
    
    //for test
    dommageDesc : any
    dommageNgModel: any
    dommages = [
      {id: 'CR', name: 'CR'},
      {id: 'DF', name: 'DF'},
      {id: 'CS', name: 'CS'},
      {id: 'CP', name: 'CP'},
      {id: 'MA', name: 'MA'},
      {id: 'RG', name: 'RG'},
      {id: 'FR', name: 'FR'},
      {id: 'DH', name: 'DH'},
      {id: 'PF', name: 'PF'},
      {id: 'RAP', name: 'RAP'},
      {id: 'DG/DF', name: 'DG/DF'},
     ];

  addCustomUser = (term) => ({id: term, name: term});


  ngOnInit(): void {
  }

  onAddDommageItem()
  {console.log(this.dommageNgModel)
  }

  fermer() {
    this.windowRef.close();
  }

}
