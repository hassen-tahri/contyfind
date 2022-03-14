import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PagesComponent } from '../pages.component';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  role: any
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.role = localStorage.getItem(PagesComponent.role)
    if (this.role == PagesComponent.admin) { return true; }
    else {
      this.router.navigate(['pages/doNotAccess'])
      return false
    }
  }
}
