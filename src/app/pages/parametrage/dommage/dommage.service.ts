import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { Dommage } from './dommage';

@Injectable({
  providedIn: 'root'
})
export class DommageService {
  url = PagesComponent.urlConfig + 'dommage'
  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<Dommage>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<Dommage[]>(this.url).toPromise();
  }

  async addDommage(user: Dommage) {
    return this.httpclient.post(this.url, user).toPromise();
  }

  async editDommage(user: Dommage) {
    return this.httpclient.put(this.url + '/' + user.id, user).toPromise();
  }

  async deleteDommage(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }
}
