import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { TypeService } from '../../type/type.service';
import { Unite } from '../unite';
import { UniteService } from '../unite.service';

@Component({
  selector: 'ngx-modal-unite',
  templateUrl: './modal-unite.component.html',
  styleUrls: ['./modal-unite.component.scss']
})
export class ModalUniteComponent implements OnInit {

  A: string
  unite: Unite
  listeType = []
  selectedType: any
  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private typeService: TypeService,
    private uniteService : UniteService) { }

  async ngOnInit() {
    let e = localStorage.getItem('e');
    this.unite = new Unite()
    this.listeType = await this.typeService.getAll()
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.unite = await this.uniteService.getById(+id)
      this.selectedType = this.unite.type.id
    }
  }

  fermer() {
    this.windowRef.close();
  }

  async onSave() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.uniteService.add(this.unite , this.selectedType)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/unite']));
      this.toastrService.success("Succès", "Unité ajoutée");
    }
    if (e === '1') {
      this.uniteService.edit(this.unite , this.selectedType)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/unite']));
      this.toastrService.success("Succès", "Unité modifiée");
    }
  }

}
