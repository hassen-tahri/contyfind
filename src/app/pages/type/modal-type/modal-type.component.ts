import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { TypeRemorque } from '../type-remorque';
import { TypeService } from '../type.service';

@Component({
  selector: 'ngx-modal-type',
  templateUrl: './modal-type.component.html',
  styleUrls: ['./modal-type.component.scss']
})
export class ModalTypeComponent implements OnInit {

  A: string
  type : TypeRemorque
  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private typeService: TypeService,) { }

  async ngOnInit() {
    let e = localStorage.getItem('e');
    this.type = new TypeRemorque()
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.type = await this.typeService.getById(+id)
    }
  }

  fermer() {
    this.windowRef.close();
  }

  async onSave() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.typeService.addType(this.type)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/type']));
      this.toastrService.success("Succès", "Categorie ajoutée");
    }
    if (e === '1') {
      this.typeService.editType(this.type)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/type']));
      this.toastrService.success("Succès", "Categorie modifiée");
    }
  }
}
