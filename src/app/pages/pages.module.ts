import { NgModule } from '@angular/core';
import { NbAccordionModule, NbAlertModule, NbButtonGroupModule, NbButtonModule, NbCalendarRangeModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbPopoverModule, NbStepperModule, NbToastrModule, NbToggleModule, NbTooltipModule } from '@nebular/theme';

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
import { ButtonViewConstatInspecteur, InspecteurComponent } from './inspecteur/inspecteur.component';
import { ModalInspecteurComponent } from './inspecteur/modal-inspecteur/modal-inspecteur.component';
import { ShowInspecteurComponent } from './inspecteur/show-inspecteur/show-inspecteur.component';
import { FormsModule } from '@angular/forms';
import { ButtonViewConstatChargeur, ChargeurComponent } from './chargeur/chargeur.component';
import { ModalChargeurComponent } from './chargeur/modal-chargeur/modal-chargeur.component';
import { ShowChargeurComponent } from './chargeur/show-chargeur/show-chargeur.component';
import { ConstatComponent } from './constat/constat.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalDommageItemComponent } from './constat/modal-dommage-item/modal-dommage-item.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ButtonViewConstatVoyage, VoyageComponent } from './voyage/voyage.component';
import { PortComponent } from './parametrage/port/port.component';
import { BateauComponent } from './parametrage/bateau/bateau.component';
import { ModalVoyageComponent } from './voyage/modal-voyage/modal-voyage.component';
import { ShowVoyageComponent } from './voyage/show-voyage/show-voyage.component';
import { TemplatePdfComponent } from './template-pdf/template-pdf.component';
import { ButtonDownloadConstat, ListConstatComponent } from './list-constat/list-constat.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ConstatChargeurComponent } from './chargeur/constat-chargeur/constat-chargeur.component';
import { ConstatVoyageComponent } from './voyage/constat-voyage/constat-voyage.component';
import { ConstatInspecteurComponent } from './inspecteur/constat-inspecteur/constat-inspecteur.component';
import { AppCameraComponent } from './template-pdf/app-camera/app-camera.component';
import { LoginComponent } from './login/login.component';



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
    WebcamModule, 
    NbToastrModule,
    NbButtonModule,
    FormsModule,
    NbLayoutModule,
    NbInputModule,
    NgSelectModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbAccordionModule,
    ImageCropperModule,
    NbTooltipModule,
    NbToggleModule,
    NbIconModule, 
    NbAlertModule,
    NbPopoverModule,
    NbEvaIconsModule,
    NbStepperModule,
    NbCalendarRangeModule,
    NbButtonGroupModule,
    
    
    
  ],
  declarations: [
    PagesComponent,
    UtilisateurComponent,
    ParametrageComponent,
    TypeComponent,
    DommageComponent,
    InspecteurComponent,
    ModalInspecteurComponent,
    ShowInspecteurComponent,
    ChargeurComponent,
    ModalChargeurComponent,
    ShowChargeurComponent,
    ConstatComponent,
    ModalDommageItemComponent,
    VoyageComponent,
    PortComponent,
    BateauComponent,
    ModalVoyageComponent,
    ShowVoyageComponent,
    TemplatePdfComponent,
    ButtonViewConstatVoyage,
    ListConstatComponent,
    ButtonDownloadConstat,
    ButtonViewConstatChargeur,
    ButtonViewConstatInspecteur,
    ConstatChargeurComponent,
    ConstatVoyageComponent,
    ConstatInspecteurComponent,
    AppCameraComponent,
    LoginComponent,
  ],
})
export class PagesModule {
}
