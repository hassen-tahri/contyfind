import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  pdftoShow : any
  pdfSrc: any;
  constructor() {}

  ngOnInit(): void {
    (window as any).pdfWorkerSrc = '../../../../assets/docs/guide.pdf';
   this.pdftoShow = '../../../../assets/docs/guide.pdf'
  }




}
