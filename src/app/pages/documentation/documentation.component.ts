import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'ngx-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  pdftoShow : any
  constructor() {     pdfMake.vfs = pdfFonts.pdfMake.vfs;}

  ngOnInit(): void {
   this.pdftoShow = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'
   //this.generatePdf()
  }

  generatePdf() {
    const pdfDocGenerator = pdfMake.createPdf('https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf');
    pdfDocGenerator.getBuffer((buffer) => {
      this.pdftoShow = buffer
    });
  }

}
