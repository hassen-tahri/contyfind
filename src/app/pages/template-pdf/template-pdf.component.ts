import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { VoyageService } from '../voyage/voyage.service';
import { ButtonViewConstatVoyage } from '../voyage/voyage.component';
import { DatePipe } from '@angular/common';
import { WebcamImage } from 'ngx-webcam';
import { FILE } from 'dns';
import { GoogleCloudVisionService } from './google-cloud-vision.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-template-pdf',
  templateUrl: './template-pdf.component.html',
  styleUrls: ['./template-pdf.component.scss']
})
export class TemplatePdfComponent implements OnInit {

  constructor(private voyageService: VoyageService,  private router: Router,
    private vision: GoogleCloudVisionService  ) { }
  listeVoyage : any
  textShow : string

  async ngOnInit()
  { //this.listeVoyage = await this.voyageService.getAll()
  }
  settings = {
    noDataMessage: "vide",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 8,
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: true,

      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',
        },
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Show"></i>',
        },
      ],
    },

    columns: {
      dateChargement: {
        title: 'Départ',
        type: 'text',
        sort: true,
        sortDirection: 'asc',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);
          var formatted = new DatePipe('fr').transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      },
      bateau: {
        title: 'Bateau',
        type: 'text',
        valuePrepareFunction: (value) => { return value.intitule },
        filterFunction(obj?: any, search?: string): boolean {
          if (obj.intitule.toLowerCase().indexOf(search) > -1 || obj.intitule.toUpperCase().indexOf(search) > -1)
            return true;
          return false;
        },
      },
      constat: {
        title: '',
        type: 'custom',
        renderComponent: ButtonViewConstatVoyage,
        filter: false,
        show: false,
        addable: false,
        editable: false,
        width: '11px',
      },
    },
  }

  title = 'htmlToPDF';
   
  @ViewChild('pdfTable') pdfTable: ElementRef;
   
  public downloadAsPDF() {
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const pdfTable = this.pdfTable.nativeElement;
    
    var html = htmlToPdfmake(pdfTable.innerHTML);
      
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
      
  }

  testReditrect()
  { localStorage.setItem("menu","true")
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/pages/voyage']));
  }


    // latest snapshot
    public webcamImage: WebcamImage = null;
    public base64Image: string;
    public visionresponse: string;
    public objvisionresponse: string;

    handleImage(webcamImage: WebcamImage) {
      this.webcamImage = webcamImage;
      this.base64Image = this.webcamImage.imageAsBase64
      this.vision.getText(this.base64Image).subscribe((result) => {
        this.base64Image = "data:image/jpg;base64," + this.base64Image;
      console.log(result['responses'][0])
        const texts = result['responses'][0]['fullTextAnnotation']['text']
        //const texts = result['responses'][0]['textAnnotations'];

        // check if text exist
        if (texts === undefined || texts === null) {
            // prompt no data
             this.visionresponse = texts;
             this.textShow = "rien"
        } else {
          
         this.textShow = texts
        }
        
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
      this.textShow = "ERROR"
    });
  }
    
}