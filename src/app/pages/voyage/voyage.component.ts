import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbCalendarRange, NbDateService, NbToastrService, NbWindowService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { ModalVoyageComponent } from './modal-voyage/modal-voyage.component';
import { ShowVoyageComponent } from './show-voyage/show-voyage.component';
import { VoyageService } from './voyage.service';



@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="container-btn">' +
    '<button nbButton hero status="info" (click)="onClick()"><nb-icon icon="file-text-outline"></nb-icon></button>' +
    '</div>',

})
export class ButtonViewConstatVoyage implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();

  }
  constructor(private router: Router) {
  }

  onClick() {
    localStorage.setItem('idVoyage', this.rowData.id);
    this.router.navigate(['/pages/constat/voyage']);
  }

}


@Component({
  selector: 'ngx-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.scss']
})
export class VoyageComponent implements OnInit {

  listeVoyage: any;
  range: NbCalendarRange<Date>;
  pipe = new DatePipe('en-US');
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, 'yyyy-MM-dd');
  SelectGroupValue = [];

  constructor(private voyageService: VoyageService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private router: Router,
    protected dateService: NbDateService<Date>,
    //groupe buton
    private cdGButon: ChangeDetectorRef) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }


  async ngOnInit() {
    this.range.start = new Date(this.now)
    this.range.end = new Date(this.now)
    this.listeVoyage = await this.voyageService.getByArchive(false)
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
        sortDirection: 'desc',
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


  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalVoyageComponent, { title: 'Ajouter' },);
  }



  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalVoyageComponent, { title: 'Modifier voyage' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(ShowVoyageComponent, { title: 'Afficher voyage' });
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce voyage`)) {
      event.confirm.resolve(await this.voyageService.deleteById(event.data.id),
        this.listeVoyage.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Voyage supprimé")
      );
    } else {
      event.confirm.reject();
    }
  }

  async onDeleteById(id: number, event) {
    if (window.confirm(`Vous etes sure de supprimer ce voyage`)) {
      await this.voyageService.deleteById(id)
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/voyage']))
      this.toastrService.warning("Succès", "Voyage supprimé");
    } else {
      event.confirm.reject();
    }
  }

  async handleRangeChange(SimpleChange) {
    if (this.SelectGroupValue[0] != "All" && this.SelectGroupValue[0] != "Archive") {
      if (this.range.end != null) {
        this.listeVoyage = await this.voyageService.getByDateChargementInRange(this.pipe.transform(this.range.start, 'yyyy-MM-dd'), this.pipe.transform(this.range.end, 'yyyy-MM-dd'))
      }
    }
  }

  async updateSelectGroupValue(value) {
    this.SelectGroupValue = value;
    this.cdGButon.markForCheck();
    if (this.SelectGroupValue[0] === "All") { this.listeVoyage = await this.voyageService.getByArchive(false) }
    if (this.SelectGroupValue[0] === "Archive") { this.listeVoyage = await this.voyageService.getByArchive(true) }
  }



}

