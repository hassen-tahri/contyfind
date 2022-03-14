import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { Chargeur } from '../chargeur/chargeur';
import { ChargeurService } from '../chargeur/chargeur.service';
import { Constat } from '../list-constat/constat';
import { ConstatService } from '../list-constat/constat.service';
import { PagePdfViewrComponent } from '../page-pdf-viewr/page-pdf-viewr.component';
import { PagesComponent } from '../pages.component';
import { PdfPageCreatorComponent } from '../pdf-page-creator/pdf-page-creator.component';

@Component({
  selector: 'ngx-constat-forchargeur',
  templateUrl: './constat-forchargeur.component.html',
  styleUrls: ['./constat-forchargeur.component.scss']
})
export class ConstatForchargeurComponent implements OnInit {

  allConstat: Constat[]
  newsConstat: Constat[]
  nbrAll: number
  nbrNews: number
  chargeur: any


  constructor(private constatService: ConstatService,
    private chargeurService: ChargeurService,
    private windowService: NbWindowService) { }

  async ngOnInit() {
    this.chargeur = new Chargeur()
    let userId = localStorage.getItem(PagesComponent.userId);
    this.chargeur = await this.chargeurService.getByUserId(+userId)
    this.allConstat = await this.constatService.getByChargeur(this.chargeur.id);
    this.newsConstat = await this.constatService.getByChargeurAndEtat(this.chargeur.id, "new");
    this.nbrAll = this.allConstat.length
    this.nbrNews = this.newsConstat.length
  }

  onCostum(event): any {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('id', event.data.id);
    this.windowService.open(PagePdfViewrComponent, { title: 'pdf constat' });
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
      delete: false,
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Show"></i>',
        },
      ],
    },


    columns: {
      id: {
        title: 'id',
        type: 'text',
      },
      unite: {
        title: 'Unite',
        type: 'text',
        valuePrepareFunction: (value) => { return value.matricule },
        filterFunction(obj?: any, search?: string): boolean {
          if (obj.intitule.toLowerCase().indexOf(search) > -1 || obj.intitule.toUpperCase().indexOf(search) > -1)
            return true;
          return false;
        },
      },
      // voyage: {
      //   title: 'Voyage',
      //   type: 'text',
      //   valuePrepareFunction: (value) => { return value.code +" "+value.bateau.intitule},
      //   filterFunction(obj?: any, search?: string): boolean {
      //     if (obj.intitule.toLowerCase().indexOf(search) > -1 || obj.intitule.toUpperCase().indexOf(search) > -1)
      //       return true;
      //     return false;
      //   },
      // },
      constat: {
        title: 'Document',
        type: 'custom',
        renderComponent: PdfPageCreatorComponent,
        filter: false,
        show: false,
        addable: false,
        editable: false,
        width: '11px',
      },
    },
  }

}
