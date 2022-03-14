import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { BateauService } from '../../bateau/bateau.service';
import { PortService } from '../../port/port.service';
import { Voyage } from '../voyage';
import { VoyageService } from '../voyage.service';

@Component({
  selector: 'ngx-show-voyage',
  templateUrl: './show-voyage.component.html',
  styleUrls: ['./show-voyage.component.scss']
})
export class ShowVoyageComponent implements OnInit {


  voyage: Voyage
  listeBateau=[]
  listePort=[]
  selectedBateau : any
  selectedPortChargement : any
  selectedPortDechargement : any

  constructor(public windowRef: NbWindowRef,
    private voyageService: VoyageService,
    private portService : PortService,
    private bateauService : BateauService) { }

  async ngOnInit() {
    this.voyage = new Voyage()
    let id = localStorage.getItem('id');
    this.voyage = await this.voyageService.getById(+id)
    this.selectedBateau =  (await this.bateauService.getById(this.voyage.bateau.id)).intitule
    this.selectedPortChargement = (await this.portService.getById(this.voyage.portChargement.id)).intitule
    this.selectedPortDechargement = (await this.portService.getById(this.voyage.portDechargement.id)).intitule
  }

  fermer() {
    this.windowRef.close();
  }

}
