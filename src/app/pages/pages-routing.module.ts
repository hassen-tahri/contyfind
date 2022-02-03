import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './Miscellaneous/not-found/not-found.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ParametrageComponent } from './parametrage/parametrage.component';
import { InspecteurComponent } from './inspecteur/inspecteur.component';
import { ChargeurComponent } from './chargeur/chargeur.component';
import { ConstatComponent } from './constat/constat.component';
import { VoyageComponent } from './voyage/voyage.component';
import { TemplatePdfComponent } from './template-pdf/template-pdf.component';
import { ListConstatComponent } from './list-constat/list-constat.component';
import { ConstatVoyageComponent } from './voyage/constat-voyage/constat-voyage.component';
import { ConstatChargeurComponent } from './chargeur/constat-chargeur/constat-chargeur.component';
import { ConstatInspecteurComponent } from './inspecteur/constat-inspecteur/constat-inspecteur.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'utilisateur',
      component: UtilisateurComponent,
    },
    {
      path: 'parametrage',
      component: ParametrageComponent,
    },
    {
      path: 'inspecteur',
      component: InspecteurComponent,
    },
    {
      path: 'chargeur',
      component: ChargeurComponent,
    },
    {
      path: 'constatPage',
      component: ConstatComponent,
    },
    {
      path: 'voyage',
      component: VoyageComponent,
    },
    {
      path: 'test',
      component: TemplatePdfComponent,
    },
    {
      path: 'constat',
      component: ListConstatComponent,
    },
    {
      path: 'constat/voyage',
      component: ConstatVoyageComponent,
    },
    {
      path: 'constat/chargeur',
      component: ConstatChargeurComponent,
    },
    {
      path: 'constat/inspecteur',
      component: ConstatInspecteurComponent,
    },
   /*  {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    }, */
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
