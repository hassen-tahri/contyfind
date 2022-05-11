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
  documentName: string

  idInsCh: any
  idInsDch: any
  targetDate : Date



  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();

  async ngOnInit() {
    this.constat = new Constat()
    this.constat = await this.constatService.getById(this.rowData.id)
    if(this.constat.phase == "chargement")
    {this.targetDate = this.constat.dateChargement}
    if(this.constat.phase == "dechargement")
    {this.targetDate = this.constat.dateDechargement}
    this.documentName =this.constat.phase+"_"+this.constat.unite.matricule + "_" + this.constat.chargeur.intitule+"_"+new DatePipe('fr').transform(this.constat.dateDechargement, 'dd/MMM/yyyy')
  }


  constructor(private constatService: ConstatService,
    private pdfTemplateService: PdfTemplateService,
    private _compiler: Compiler) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  onClick() {
    let role = localStorage.getItem(PagesComponent.role)
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
    this._compiler.clearCache();
    const documentDefinition = await this.pdfTemplateService.getDocumentDefinition(this.constat);
    pdfMake.createPdf(documentDefinition).download(this.documentName);
  }


}
