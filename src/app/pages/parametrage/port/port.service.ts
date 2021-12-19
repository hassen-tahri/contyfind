import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { Port } from './port';

@Injectable({
  providedIn: 'root'
})
export class PortService {
  url = PagesComponent.urlConfig + 'port'

  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<Port>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<Port[]>(this.url).toPromise();
  }

  async addPort(port: Port) {
    return this.httpclient.post(this.url, port).toPromise();
  }

  async editPort(port: Port) {
    return this.httpclient.put(this.url + '/' + port.id, port).toPromise();
  }

  async deletePort(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }
}
