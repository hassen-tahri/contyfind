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
   this.pdftoShow = 'https://hassen-tahri.github.io/docs/guide.pdf'
  }




}
