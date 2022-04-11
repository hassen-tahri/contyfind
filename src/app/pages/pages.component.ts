import { Component, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem } from '@nebular/theme';
import { MenuService } from './login/menu.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  //Variable for localStorage
  public static userSession = "userSession"
  public static role = "role"
  public static connecte = "connecte"
  public static userId = "userId"
  public static chargeur = "chargeur"
  public static admin = "admin"
  public static inspecteur = "inspecteur"


  menu = MENU_ITEMS;
  public static urlConfig = 'http://localhost:9099/';
  //public static urlConfig = 'https://springesurveys.herokuapp.com/';
  public static urlDomaine = 'http://localhost:4200/';
  roleItem: any
  constructor(
    private accessChecker: NbAccessChecker,
    private menuService: MenuService) {
    this.roleItem = localStorage.getItem("role")
    this.menu.forEach(item => {
      if (this.roleItem === "chargeur") {
        this.menuService.enableMenuItem("chargeur", "chargeur", "chargeur", item)
        this.menuService.disableMenuItem("admin", "admin", "admin", item)
        this.menuService.disableMenuItem("inspecteur", "inspecteur", "inspecteur", item)
      }
      if (this.roleItem === "admin" || this.roleItem === "inspecteur") {
        this.menuService.disableMenuItem("chargeur", "chargeur", "chargeur", item)
        this.menuService.enableMenuItem("admin", "admin", "admin", item)
        this.menuService.enableMenuItem("inspecteur", "inspecteur", "inspecteur", item)
      }
    });
  }




}
