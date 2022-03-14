import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PagesComponent } from '../pages.component';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(private router: Router) { }
  session: any
  result: any
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.session = localStorage.getItem(PagesComponent.userSession)
    if (this.session == null) {
      this.result = false
      this.router.navigate(['auth'])
    }
    else if (this.session != '') {
      this.result = true
    }
    return this.result
  }

}
