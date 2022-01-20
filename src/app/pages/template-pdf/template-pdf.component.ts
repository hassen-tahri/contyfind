import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'ngx-template-pdf',
  templateUrl: './template-pdf.component.html',
  styleUrls: ['./template-pdf.component.scss']
})
export class TemplatePdfComponent implements OnInit {

  constructor() { }
  @ViewChild('content') content: ElementRef;
  ngOnInit(): void {
  }

  exportAsPDF()
  {
    let data = this.content.nativeElement;  
    html2canvas(data).then(canvas => {
    //const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
    let pdf = new jsPDF('p', 'px', 'a4');
   //pdf.html(data.innerHtml) //Generates PDF in landscape mode
    // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
    //pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
    pdf.save('Filename.pdf');   
  });  
  }
}
