import { DatePipe } from '@angular/common';
import {  Component, EventEmitter, Input, OnInit, Output, VERSION } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Constat } from '../list-constat/constat';
import { ConstatService } from '../list-constat/constat.service';
import { PdfTemplateService } from '../pdf-page-creator/pdf-template.service';

@Component({
  selector: 'ngx-page-pdf-viewr',
  templateUrl: './page-pdf-viewr.component.html',
  styleUrls: ['./page-pdf-viewr.component.scss']
})
export class PagePdfViewrComponent implements OnInit {
  constat: Constat
  pdftoShow : any

  constructor(private constatService: ConstatService,
     private pdfTemplate : PdfTemplateService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }


  async ngOnInit() {
    this.constat = new Constat()
    let id = localStorage.getItem('id'); 
    this.constat = await this.constatService.getById(+id)
    this.generatePdf()
  }



  async generatePdf() {
    const documentDefinition = await this.pdfTemplate.getDocumentDefinition(this.constat);
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getBuffer((buffer) => {
      this.pdftoShow = buffer
    });
  }





}
