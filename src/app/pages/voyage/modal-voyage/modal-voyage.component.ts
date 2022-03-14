import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { BateauService } from '../../bateau/bateau.service';
import { PortService } from '../../port/port.service';
import { Voyage } from '../voyage';
import { VoyageService } from '../voyage.service';

@Component({
  selector: 'ngx-modal-voyage',
  templateUrl: './modal-voyage.component.html',
  styleUrls: ['./modal-voyage.component.scss']
})
export class ModalVoyageComponent implements OnInit {
  A: string
  voyage: Voyage
  listeBateau = []
  listePort = []
  selectedBateau: any
  selectedPortChargement: any
  selectedPortDechargement: any

  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private voyageService: VoyageService,
    private portService: PortService,
    private bateauService: BateauService) { }


  async ngOnInit() {
    let e = localStorage.getItem('e');
    this.voyage = new Voyage()
    this.listeBateau = await this.bateauService.getAll()
    this.listePort = await this.portService.getAll()
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.voyage = await this.voyageService.getById(+id)
      this.selectedBateau = this.voyage.bateau.id
      this.selectedPortChargement = this.voyage.portChargement.id
      this.selectedPortDechargement = this.voyage.portDechargement.id
    }
  }

  async onAddVoyage() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      if (await this.voyageService.getByCode(this.voyage.code) != null) {
        this.toastrService.danger("Le code : " + this.voyage.code + " existe déjà", "Vérifier le code");
      }
      else {
        this.voyage.archive = false
        console.log(this.voyage)
        this.voyageService.addVoyage(this.voyage, this.selectedBateau, this.selectedPortChargement, this.selectedPortDechargement)
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages/voyage']));
        this.toastrService.success("Succès", "Voyage Ajoutée")
      }
    } if (e === '1') {
      this.voyageService.editVoyage(this.voyage, this.voyage.id, this.selectedBateau, this.selectedPortChargement, this.selectedPortDechargement)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/voyage']));
      this.toastrService.success("Succès", "Voyage modifiée");
    }


  }

  fermer() {
    this.windowRef.close();
  }

}
