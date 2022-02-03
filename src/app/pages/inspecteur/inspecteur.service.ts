import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Inspecteur } from './inspecteur';

@Injectable({
  providedIn: 'root'
})
export class InspecteurService {
  url = PagesComponent.urlConfig + 'inspecteur'

  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<Inspecteur>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<Inspecteur[]>(this.url).toPromise();
  }

  async addInspecteur(inspecteur: Inspecteur, idUser: number) {
    return this.httpclient.post(this.url + '/user/' + idUser, inspecteur).toPromise();
  }

  async editInspecteur(inspecteur: Inspecteur, idUser: number) {
    return this.httpclient.put(this.url +"/"+ inspecteur.id + '/user/' + idUser, inspecteur).toPromise();
  }

  async deleteInspecteur(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }

  async getByUserId(id: Number) {
    return this.httpclient.get<Inspecteur>(this.url + '/user/' + id).toPromise();
  }

}
