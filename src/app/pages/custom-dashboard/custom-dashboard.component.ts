import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChargeurService } from '../chargeur/chargeur.service';
import { InspecteurService } from '../inspecteur/inspecteur.service';
import { ConstatService } from '../list-constat/constat.service';
import { VoyageService } from '../voyage/voyage.service';


@Component({
  selector: 'ngx-custom-dashboard',
  templateUrl: './custom-dashboard.component.html',
  styleUrls: ['./custom-dashboard.component.scss']
})
export class CustomDashboardComponent implements OnInit {

  chargeurs = []
  inspecteurs = []
  options: any = {};
  options1: any = {};
  formationCategorieOptions: any = {};
  formationTypesOptions: any = {};
  demandeEtatOptions: any = {};
  clientTypesOptions: any = {};
  themeSubscription: any;

  now = new Date(Date.now());
  firstDateOfWeek: Date
  firstDateOfWeek2: Date
  pipe = new DatePipe('en-US'); // Use your own locale
  nbrVoyageLundi: any;
  nbrVoyageMardi: any;
  nbrVoyageMercredi: any;
  nbrVoyageVendreudi: any;
  nbrVoyageJeudi: any;
  nbrVoyageSamedi: any;
  nbrVoyageDimanche: any;
  nbrAllVoyage
  nbrAllConstat
  nbrConstatCh
  nbrconstatDch


  constructor(private chargeurService : ChargeurService,
              private inspecteurService : InspecteurService,
              private constatService : ConstatService,
              private theme: NbThemeService, 
              private voyageService : VoyageService) { }


  async ngOnInit() {
   this.inspecteurs = await this.inspecteurService.getAll()
   this.chargeurs = await this.chargeurService.getAll()
   this.nbrAllVoyage = await this.voyageService.countAll()
   this.nbrAllConstat = await this.constatService.countAll()
   this.nbrConstatCh = await this.constatService.countByPhase("chargement")
   this.nbrconstatDch = await this.constatService.countByPhase("dechargement")
  }

  async getNbrByChargeurChargement(id : number)
  {return await this.constatService.countByChargeurAndPhase(id,"chargement")}

  async getNbrByChargeurDeChargement(id : number)
  {return await this.constatService.countByChargeurAndPhase(id,"dechargement")}

  getFirstdayOfWeek(dateNow: Date) {
    switch (dateNow.getDay()) {

      case 0:
        dateNow.setDate(dateNow.getDate() - 6)
        break;
      case 1:
        break;
      case 2:
        dateNow.setDate(dateNow.getDate() - 1)
        break;
      case 3:
        dateNow.setDate(dateNow.getDate() - 2)
        break;
      case 4:
        dateNow.setDate(dateNow.getDate() - 3)
        break;
      case 5:
        dateNow.setDate(dateNow.getDate() - 4)
        break;
      case 6:
        dateNow.setDate(dateNow.getDate() - 5)
        break;
    }
    return dateNow
  }


  async ngAfterViewInit() {
    this.firstDateOfWeek = this.getFirstdayOfWeek(this.now)
    //preparation Data
    //-------------------------------------------------------------- 













    this.nbrVoyageLundi = await this.voyageService.countByDate(this.pipe.transform(this.firstDateOfWeek, 'yyyy-MM-dd'))
    this.nbrVoyageMardi = await this.voyageService.countByDate(this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'yyyy-MM-dd'))
    this.nbrVoyageMercredi = await this.voyageService.countByDate(this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'yyyy-MM-dd'))
    this.nbrVoyageJeudi = await this.voyageService.countByDate(this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'yyyy-MM-dd'))
    this.nbrVoyageVendreudi = await this.voyageService.countByDate(this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'yyyy-MM-dd'))
    this.nbrVoyageSamedi = await this.voyageService.countByDate(this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'yyyy-MM-dd'))
    this.nbrVoyageDimanche = await this.voyageService.countByDate(this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'yyyy-MM-dd'))


    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      //config charts voyage
      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['Lundi\n' + this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() - 6), 'dd-MM-yyyy'),
            'Mardi\n' + this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'dd-MM-yyyy'),
            'Mercredi\n' + this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'dd-MM-yyyy'),
            'Jeudi\n' + this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'dd-MM-yyyy'),
            'Vendredi\n' + this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'dd-MM-yyyy'),
            'Samedi\n' + this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'dd-MM-yyyy'),
            'Dimanche\n' + this.pipe.transform(this.firstDateOfWeek.setDate(this.firstDateOfWeek.getDate() + 1), 'dd-MM-yyyy')],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'nombre',
            type: 'bar',
            barWidth: '60%',
            data: [this.nbrVoyageLundi, this.nbrVoyageMardi, this.nbrVoyageMercredi, this.nbrVoyageJeudi, this.nbrVoyageVendreudi, this.nbrVoyageSamedi, this.nbrVoyageDimanche],
          },
        ],
      };
    });
  }



}
