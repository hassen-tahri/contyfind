import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Chargeur } from './chargeur';

@Injectable({
  providedIn: 'root'
})
export class ChargeurService {
  url = PagesComponent.urlConfig + 'chargeur'

  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<Chargeur>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<Chargeur[]>(this.url).toPromise();
  }

  async addChargeur(chargeur: Chargeur, idUser: number) {
    return this.httpclient.post(this.url + '/user/' + idUser, chargeur).toPromise();
  }

  async editChargeur(chargeur: Chargeur, idUser: number) {
    return this.httpclient.put(this.url + "/" + chargeur.id + '/user/' + idUser, chargeur).toPromise();
  }

  async deleteChargeur(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }

  async getByUserId(id: Number) {
    return this.httpclient.get<Chargeur>(this.url + '/user/' + id).toPromise();
  }
}
