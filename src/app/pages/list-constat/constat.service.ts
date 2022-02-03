import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Constat } from './constat';

@Injectable({
  providedIn: 'root'
})
export class ConstatService {
  url = PagesComponent.urlConfig + 'constat'

  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<Constat>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<Constat[]>(this.url).toPromise();
  }

  async getByVoyage(id: Number) {
    return this.httpclient.get<Constat[]>(this.url + '/voyage/' + id).toPromise();
  }

  async getByChargeur(id: Number) {
    return this.httpclient.get<Constat[]>(this.url + '/chargeur/' + id).toPromise();
  }

  async getByInspecteurCh(id: Number) {
    return this.httpclient.get<Constat[]>(this.url + '/inspecteurChargement/' + id).toPromise();
  }

  async getByInspecteurDch(id: Number) {
    return this.httpclient.get<Constat[]>(this.url + '/inspecteurDechargement/' + id).toPromise();
  }

  async getByEtat(etat : string) {
    return this.httpclient.get<Constat[]>(this.url + '/etat/' + etat).toPromise();
  }

  async addConstat(constat: Constat, idV: Number, idCh: Number, idTr: Number, idInsCh: Number, idInsDch: Number) {
    return this.httpclient.post(this.url + '/voyage/' + idV + '/chargeur/' + idCh + '/typeRemorque/' + idTr + '/inspecteurCh/' + idInsCh + '/inspecteurDch/' + idInsDch, constat).toPromise();
  }

  async editConstat(constat: Constat, idV: Number, idCh: Number, idTr: Number, idInsCh: Number, idInsDch: Number) {
    return this.httpclient.put(this.url + "/" + constat.id + '/voyage/' + idV + '/chargeur/' + idCh + '/typeRemorque/' + idTr + '/inspecteurCh/' + idInsCh + '/inspecteurDch/' + idInsDch, constat).toPromise();
  }

  async getByDateChargementInRange(dateDeb : string , dateFin : string) {
    return this.httpclient.get<Constat[]>(this.url+"/RangeChargement/"+dateDeb+"/"+dateFin).toPromise();
  }

  async getByDateDechargementInRange(dateDeb : string , dateFin : string) {
    return this.httpclient.get<Constat[]>(this.url+"/RangeDechargement/"+dateDeb+"/"+dateFin).toPromise();
  }

  async getByInspecteurChargementAndDateChargementInRange(id : number ,dateDeb : string , dateFin : string){
    return this.httpclient.get<Constat[]>(this.url+"/InspecteurChargement/RangeChargement/"+id+"/"+dateDeb+"/"+dateFin).toPromise();
  }

  async getByInspecteurDechargementAndDateChargementInRange(id : number ,dateDeb : string , dateFin : string){
    return this.httpclient.get<Constat[]>(this.url+"/InspecteurDechargement/RangeChargement/"+id+"/"+dateDeb+"/"+dateFin).toPromise();
  }
  
}
