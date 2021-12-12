import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './Miscellaneous/miscellaneous.module';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ParametrageComponent } from './parametrage/parametrage.component';
import { TypeComponent } from './parametrage/type/type.component';
import { DommageComponent } from './parametrage/dommage/dommage.component';
import { WebcamModule } from 'ngx-webcam';
import { InspecteurComponent } from './inspecteur/inspecteur.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCardModule,
    Ng2SmartTableModule,
    WebcamModule
  ],
  declarations: [
    PagesComponent,
    UtilisateurComponent,
    ParametrageComponent,
    TypeComponent,
    DommageComponent,
    InspecteurComponent,
  ],
})
export class PagesModule {
}
