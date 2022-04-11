import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { DommageItem } from './dommage-item';

@Injectable({
  providedIn: 'root'
})
export class DommageItemService {
  url = PagesComponent.urlConfig + 'dommageItem'
  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<DommageItem>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<DommageItem[]>(this.url).toPromise();
  }

  async add(item: DommageItem, idD: number, idC: number) {
    return this.httpclient.post(this.url + '/dommage/' + idD + "/constat/" + idC, item).toPromise();
  }

  async edit(item: DommageItem, idD: number, idC: number) {
    return this.httpclient.put(this.url + "/" + item.id + '/dommage/' + idD + "/constat/" + idC, item).toPromise();
  }

  async delete(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }

  async getByConstatId(id: Number) {
    return this.httpclient.get<DommageItem[]>(this.url + '/constat/' + id).toPromise();
  }

  async getByConstatIdAndPhase(id: Number , phase : string) {
    return this.httpclient.get<DommageItem[]>(this.url + '/constat/' + id + "/phase/" + phase).toPromise();
  }
}
