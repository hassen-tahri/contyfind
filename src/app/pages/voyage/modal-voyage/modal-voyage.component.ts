import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { BateauService } from '../../parametrage/bateau/bateau.service';
import { PortService } from '../../parametrage/port/port.service';
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
  listeBateau=[]
  listePort=[]
  selectedBateau : any
  selectedPortChargement : any
  selectedPortDechargement : any
  
  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private voyageService: VoyageService,
    private portService : PortService,
    private bateauService : BateauService) { }


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

  async onAddVoyage()
  {
    this.voyageService.addVoyage(this.voyage,this.selectedBateau,this.selectedPortChargement,this.selectedPortDechargement)
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    this.windowRef.close();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/voyage']));
    this.toastrService.success("Succès", "Voyage ajouté");
  }

  fermer() {
    this.windowRef.close();
  }

}
