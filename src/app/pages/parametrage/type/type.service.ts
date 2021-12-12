import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { TypeRemorque } from './typeRemorque';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  url = PagesComponent.urlConfig + 'type'
  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<TypeRemorque>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<TypeRemorque[]>(this.url).toPromise();
  }

  async addType(user: TypeRemorque) {
    return this.httpclient.post(this.url, user).toPromise();
  }

  async editType(user: TypeRemorque) {
    return this.httpclient.put(this.url + '/' + user.id, user).toPromise();
  }

  async deleteType(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }
}
