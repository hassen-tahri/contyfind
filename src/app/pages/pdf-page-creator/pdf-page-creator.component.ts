import { DatePipe } from '@angular/common';
import { Compiler, Component, EventEmitter, Input, OnInit, Output, VERSION } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Constat } from '../list-constat/constat';
import { ConstatService } from '../list-constat/constat.service';
import { PagesComponent } from '../pages.component';
import { PdfTemplateService } from './pdf-template.service';

@Component({
  selector: 'ngx-pdf-page-creator',
  templateUrl: './pdf-page-creator.component.html',
  styleUrls: ['./pdf-page-creator.component.scss']
})

export class PdfPageCreatorComponent implements ViewCell, OnInit {
  renderValue: string;
  constat: Constat
  name = 'Angular ' + VERSION.major;
  base64Image: any;
  testVbateau: string
  documentName : string



  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();

  async ngOnInit() {
    this.constat = new Constat()
    this.constat = await this.constatService.getById(this.rowData.id)
    this.documentName = this.constat.chargeur.intitule+"_"+this.constat.unite.matricule
  }


  constructor(private constatService: ConstatService,
    private pdfTemplateService : PdfTemplateService,
    private _compiler: Compiler) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  onClick() {
    let role = localStorage.getItem(PagesComponent.role)
    if (role == "chargeur") {
      this.constat.etat = "old"
      this.constatService.editConstat(this.constat, this.constat.voyage.id, this.constat.chargeur.id, this.constat.unite.id, this.constat.inspecteurChargement.id, this.constat.inspecteurDechargement.id)
    }
    this.generatePdf()
  }

  async generatePdf() {
    this._compiler.clearCache();
    const documentDefinition = await this.pdfTemplateService.getDocumentDefinition(this.constat);
    pdfMake.createPdf(documentDefinition).download(this.documentName);
  }


}
