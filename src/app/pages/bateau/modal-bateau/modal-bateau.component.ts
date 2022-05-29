import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Bateau } from '../bateau';
import { BateauService } from '../bateau.service';

@Component({
  selector: 'ngx-modal-bateau',
  templateUrl: './modal-bateau.component.html',
  styleUrls: ['./modal-bateau.component.scss']
})
export class ModalBateauComponent implements OnInit {

  A: string
  bateau: Bateau
  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private bateauService: BateauService,) { }

  async ngOnInit() {
    let e = localStorage.getItem('e');
    this.bateau = new Bateau()
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.bateau = await this.bateauService.getById(+id)
    }
  }

  fermer() {
    this.windowRef.close();
  }

  async onSave() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.bateauService.addBateau(this.bateau)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/esurveys']));
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/bateau']));
      this.toastrService.success("Succès", "Bateau ajouté");
    }
    if (e === '1') {
      this.bateauService.editBateau(this.bateau)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/bateau']));
      this.toastrService.success("Succès", "Bateau modifié");
    }
  }

}
