import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BaseDesignComponent } from './base-design/base-design.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import  {FlexLayoutModule} from '@angular/flex-layout';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WebService } from './web.service';
import { MainSocketService } from './main-socket.service';
import { CommonModule, NgIf } from '@angular/common';
import { DocumentListComponent } from './data-management/document-list/document-list.component';
import { EditDocumentComponent } from './data-management/document-list/edit-document/edit-document.component';
import { ServiceListComponent } from './data-management/service-list/service-list.component';
import { EditServiceComponent } from './data-management/service-list/edit-service/edit-service.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { DriverListComponent } from './driver-management/driver-list/driver-list.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ZoneListComponent } from './zone-management/zone-list/zone-list.component';
import { ZoneAddComponent } from './zone-management/zone-add/zone-add.component';
import { ZoneEditComponent } from './zone-management/zone-edit/zone-edit.component';
import { ServicePriceListComponent } from './zone-management/service-price-list/service-price-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    BaseDesignComponent,
    DashboardPageComponent,
    DocumentListComponent,
    EditDocumentComponent,
    ServiceListComponent,
    EditServiceComponent,
    UserListComponent,
    DriverListComponent,
    ZoneAddComponent,
    ZoneListComponent,
    ZoneEditComponent,
    ServicePriceListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    FlexLayoutModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSidenavModule, NgIf, MatButtonModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
  ],
  providers: [
    WebService,
    MainSocketService,
  ],
  
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
