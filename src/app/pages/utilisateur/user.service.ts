import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = PagesComponent.urlConfig + 'user'
  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<User>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<User[]>(this.url).toPromise();
  }

  async addUser(user: User) {
    return this.httpclient.post(this.url, user).toPromise();
  }

  async editUser(user: User) {
    return this.httpclient.put(this.url + '/' + user.id, user).toPromise();
  }

  async deleteUser(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }

  async getByPseudo(pseudo : string) {
    return this.httpclient.get<User>(this.url + '/pseudo/' + pseudo).toPromise();
  }

}
