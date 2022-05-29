import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Dommage } from '../dommage';
import { DommageService } from '../dommage.service';

@Component({
  selector: 'ngx-modal-dommage',
  templateUrl: './modal-dommage.component.html',
  styleUrls: ['./modal-dommage.component.scss']
})
export class ModalDommageComponent implements OnInit {

  A: string
  dommage : Dommage
  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private dommageService: DommageService,) { }

  async ngOnInit() {
    let e = localStorage.getItem('e');
    this.dommage = new Dommage()
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.dommage = await this.dommageService.getById(+id)
    }
  }

  fermer() {
    this.windowRef.close();
  }

  async onSave() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.dommageService.addDommage(this.dommage)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/esurveys']));
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/dommage']));
      this.toastrService.success("Succès", "Dommage ajouté");
    }
    if (e === '1') {
      this.dommageService.editDommage(this.dommage)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/dommage']));
      this.toastrService.success("Succès", "Dommage modifié");
    }
  }
}
