import { DatePipe } from '@angular/common';
import {  Component, EventEmitter, Input, OnInit, Output, VERSION } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Constat } from '../list-constat/constat';
import { ConstatService } from '../list-constat/constat.service';
import { PagesComponent } from '../pages.component';
import { PdfTemplateService } from '../pdf-page-creator/pdf-template.service';

@Component({
  selector: 'ngx-page-pdf-viewr',
  templateUrl: './page-pdf-viewr.component.html',
  styleUrls: ['./page-pdf-viewr.component.scss']
})
export class PagePdfViewrComponent implements OnInit {
  constat: Constat
  pdftoShow : any
  idInsCh: number;
  idInsDch: number;
  zoomValue : number

  constructor(private constatService: ConstatService,
     private pdfTemplate : PdfTemplateService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }


  async ngOnInit() {
    this.constat = new Constat()
    let id = localStorage.getItem('id'); 
    this.constat = await this.constatService.getById(+id)
    let role = localStorage.getItem(PagesComponent.role)
    this.zoomValue = 1
    console.log(this.zoomValue)
    if (role == "chargeur") {
      this.constat.etat = "old"
      if (this.constat.inspecteurChargement == null) { this.idInsCh = -1 }
      else { this.idInsCh = this.constat.inspecteurChargement.id }
      if (this.constat.inspecteurDechargement == null) { this.idInsDch = -1 }
      else { this.idInsDch = this.constat.inspecteurDechargement.id }
      this.constatService.editConstat(this.constat, this.constat.voyage.id, this.constat.chargeur.id, this.constat.unite.id, this.idInsCh, this.idInsDch)
    }
    this.generatePdf()
  }



  async generatePdf() {
    const documentDefinition = await this.pdfTemplate.getDocumentDefinition(this.constat);
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getBuffer((buffer) => {
      this.pdftoShow = buffer
    });
  }

  zoomIn()
  {this.zoomValue++}

  zoomOut()
  {this.zoomValue--}

  resetZoom()
  {this.zoomValue = 1}





}
