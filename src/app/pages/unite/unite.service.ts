import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Unite } from './unite';

@Injectable({
  providedIn: 'root'
})
export class UniteService {
  url = PagesComponent.urlConfig + 'unite'
  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<Unite>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<Unite[]>(this.url).toPromise();
  }

  async add(unite: Unite, idType: number) {
    return this.httpclient.post(this.url + '/type/' + idType, unite).toPromise();
  }

  async edit(unite: Unite, idType: number) {
    return this.httpclient.put(this.url + "/" + unite.id + '/type/' + idType, unite).toPromise();
  }

  async delete(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }

  async getByMatricule(matricule: string) {
    return this.httpclient.get<Unite>(this.url + '/matricule/' + matricule).toPromise();
  }

  async getByType(idT: number) {
    return this.httpclient.get<Unite>(this.url + '/type/' + idT).toPromise();
  }

}
