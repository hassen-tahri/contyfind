import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Voyage } from './voyage';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
  url = PagesComponent.urlConfig + 'voyage'

  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<Voyage>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<Voyage[]>(this.url).toPromise();
  }

  async deleteById(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }

  async addVoyage(voyage: Voyage, idB: number, idPCh: number, idPDch) {
    return this.httpclient.post(this.url + "/bateau/" + idB + "/portCh/" + idPCh + "/portDch/" + idPDch, voyage).toPromise();
  }

  async editVoyage(voyage: Voyage, idv: number, idB: number, idPCh: number, idPDch) {
    return this.httpclient.put(this.url + "/" + idv + "/bateau/" + idB + "/portCh/" + idPCh + "/portDch/" + idPDch, voyage).toPromise();
  }

}
