import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Port } from '../port';
import { PortService } from '../port.service';

@Component({
  selector: 'ngx-modal-port',
  templateUrl: './modal-port.component.html',
  styleUrls: ['./modal-port.component.scss']
})
export class ModalPortComponent implements OnInit {

  A: string
  port : Port
  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private portService: PortService,) { }

  async ngOnInit() {
    let e = localStorage.getItem('e');
    this.port = new Port()
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.port = await this.portService.getById(+id)
    }
  }

  fermer() {
    this.windowRef.close();
  }

  async onSave() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.portService.addPort(this.port)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/port']));
      this.toastrService.success("Succès", "Port ajouté");
    }
    if (e === '1') {
      this.portService.editPort(this.port)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/port']));
      this.toastrService.success("Succès", "Port modifié");
    }
  }

}
