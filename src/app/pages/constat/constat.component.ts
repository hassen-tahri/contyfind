import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ModalDommageItemComponent } from './modal-dommage-item/modal-dommage-item.component';

@Component({
  selector: 'ngx-constat',
  templateUrl: './constat.component.html',
  styleUrls: ['./constat.component.scss']
})
export class ConstatComponent implements OnInit {
  source: any
  constructor(private windowService: NbWindowService,
    private toastrService: NbToastrService) { }

  ngOnInit(): void {
  }

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalDommageItemComponent, { title: 'Ajouter un dommage' },);
  }

}
