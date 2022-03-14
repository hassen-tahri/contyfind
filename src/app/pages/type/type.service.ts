import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { TypeRemorque } from './type-remorque';

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

  async addType(type: TypeRemorque) {
    return this.httpclient.post(this.url, type).toPromise();
  }

  async editType(type: TypeRemorque) {
    return this.httpclient.put(this.url + '/' + type.id, type).toPromise();
  }

  async deleteType(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }
}
