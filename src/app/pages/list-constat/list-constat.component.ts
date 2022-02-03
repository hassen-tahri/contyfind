import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbCalendarRange, NbDateService, NbToastrService, NbWindowService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { ConstatService } from './constat.service';

@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="container-btn">' +
    '<button nbButton status="success"><nb-icon icon="download"></nb-icon></button>' +
    '</div>',

})
export class ButtonDownloadConstat implements ViewCell, OnInit {
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
  }
}


@Component({
  selector: 'ngx-list-constat',
  templateUrl: './list-constat.component.html',
  styleUrls: ['./list-constat.component.scss']
})
export class ListConstatComponent implements OnInit {


  source: any
  range: NbCalendarRange<Date>;
  pipe = new DatePipe('en-US');
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, 'yyyy-MM-dd');
  checked: any
  SelectGroupValue = [];


  constructor(private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private constatService: ConstatService,
    private router: Router,
    protected dateService: NbDateService<Date>,
    private cdGButon: ChangeDetectorRef
  ) {
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
    this.source = await this.constatService.getByDateChargementInRange(this.myFormattedDate, this.myFormattedDate)
    console.log(this.myFormattedDate)
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
      id: {
        title: 'id',
        type: 'text',
      },
      remorqueCode: {
        title: 'remorque',
        type: 'text',
      },
      constat: {
        title: '',
        type: 'custom',
        renderComponent: ButtonDownloadConstat,
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
    //this.windowService.open(ModalInspecteurComponent, {title: 'Ajouter un inspecteur'},);
  }



  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      // this.windowService.open(ModalInspecteurComponent, {title: 'Modifier les informations de cet inspecteur'});
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      // this.windowService.open(ShowInspecteurComponent, {title: 'Afficher les informations de cet inspecteur'});
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer cet inspecteur`)) {
      event.confirm.resolve(
        //await this.inspecteurService.deleteInspecteur(event.data.id),
        this.source.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Inspecteur supprimé")
      );
    } else {
      event.confirm.reject();
    }
  }

  redirectToConstatPage() {
    localStorage.setItem("SConstat", "0")
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/constatPage']));
  }


  async handleRangeChange(SimpleChange) {
    if (this.SelectGroupValue[0] != "All" && this.SelectGroupValue[0] != "Archive") {
      if (this.range.end != null) {
        this.source = await this.constatService.getByDateChargementInRange(this.pipe.transform(this.range.start, 'yyyy-MM-dd'), this.pipe.transform(this.range.end, 'yyyy-MM-dd'))
      }
    }
  }

  async updateSelectGroupValue(value) {
    this.SelectGroupValue = value;
    this.cdGButon.markForCheck();
    if (this.SelectGroupValue[0] === "All") { this.source = await this.constatService.getAll() }
    if (this.SelectGroupValue[0] === "owner") { this.source = await this.constatService.getByInspecteurCh(9) }
  }




}
