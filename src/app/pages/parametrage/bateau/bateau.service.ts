import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { Bateau } from './bateau';

@Injectable({
  providedIn: 'root'
})
export class BateauService {
  url = PagesComponent.urlConfig + 'bateau'

  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<Bateau>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<Bateau[]>(this.url).toPromise();
  }

  async addBateau(bateau: Bateau) {
    return this.httpclient.post(this.url, bateau).toPromise();
  }

  async editBateau(bateau: Bateau) {
    return this.httpclient.put(this.url + '/' + bateau.id, bateau).toPromise();
  }

  async deleteBateau(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }
}
