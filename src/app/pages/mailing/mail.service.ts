import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Mail } from './mail';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  url = PagesComponent.urlConfig + 'email'

  constructor(protected httpclient: HttpClient) { }

  async sendMail(mail: Mail) {
    return this.httpclient.post(this.url, mail).toPromise();
  }
}
