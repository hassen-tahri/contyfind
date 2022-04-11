import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PagesComponent } from '../../../pages/pages.component';
import { ChargeurService } from '../../../pages/chargeur/chargeur.service';
import { InspecteurService } from '../../../pages/inspecteur/inspecteur.service';
import { Chargeur } from '../../../pages/chargeur/chargeur';
import { Inspecteur } from '../../../pages/inspecteur/inspecteur';
import { User } from '../../../pages/utilisateur/user';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any; 
  profilPageLink =""
  role : string
  customUserName : string
  chargeur : Chargeur
  inspecteur : Inspecteur

  themes = [
    {
      value: 'default',
      name: 'Clair',
    },
    {
      value: 'dark',
      name: 'Sombre',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profil', link : this.profilPageLink }, { title: 'Déconnexion' , link:'auth'} ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private chargeurService : ChargeurService,
              private inspecteurService : InspecteurService) {
                
  }

  async ngOnInit() {
    //session settings
    this.role = localStorage.getItem(PagesComponent.role)
    let userId = localStorage.getItem(PagesComponent.userId)
    if (this.role === PagesComponent.chargeur) {
      this.profilPageLink = "pages/profilChargeur"
      this.chargeur = new Chargeur()
      this.chargeur = await this.chargeurService.getByUserId(+userId)
      this.customUserName = this.chargeur.intitule
      this.userMenu = [ { title: 'Profil', link : this.profilPageLink, }, { title: 'Déconnexion' , link:'auth'} ];
    }
    if (this.role === PagesComponent.inspecteur) {
      this.profilPageLink = "pages/profilInspecteur"
      this.inspecteur = new Inspecteur()
      this.inspecteur = await this.inspecteurService.getByUserId(+userId)
      this.customUserName = this.inspecteur.nom + " " + this.inspecteur.prenom
      this.userMenu = [ { title: 'Profil', link : this.profilPageLink, }, { title: 'Déconnexion' , link:'auth'} ];
    }
    if (this.role === PagesComponent.admin) { 
      this.customUserName = localStorage.getItem(PagesComponent.userSession)
      this.userMenu = [{ title: 'Déconnexion' , link:'auth'} ];
    }


    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
