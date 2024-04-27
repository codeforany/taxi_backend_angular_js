import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BaseDesignComponent } from './base-design/base-design.component';
import { authGuard } from './auth.guard';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DocumentListComponent } from './data-management/document-list/document-list.component';
import { ServiceListComponent } from './data-management/service-list/service-list.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { DriverListComponent } from './driver-management/driver-list/driver-list.component';
import { ZoneListComponent } from './zone-management/zone-list/zone-list.component';
import { ZoneAddComponent } from './zone-management/zone-add/zone-add.component';
import { ZoneEditComponent } from './zone-management/zone-edit/zone-edit.component';
import { ServicePriceListComponent } from './zone-management/service-price-list/service-price-list.component';
import { ServiceDocumentListComponent } from './zone-management/service-document-list/service-document-list.component';
import { CarAddComponent } from './car-management/car-add/car-add.component';
import { BrandListComponent } from './car-management/brand-list/brand-list.component';
import { ModelListComponent } from './car-management/model-list/model-list.component';
import { SeriesListComponent } from './car-management/series-list/series-list.component';
import { DriverDetailComponent } from './driver-management/driver-detail/driver-detail.component';

const routes: Routes = [{
  path: "login",
  component: AdminLoginComponent
}, {
  path: "",
  component: BaseDesignComponent,
  canActivate: [authGuard],
  children: [
    {
      path: "",
      component: DashboardPageComponent
    }, {
      path: "document-list",
      component: DocumentListComponent
    }
    , {
      path: "service-list",
      component: ServiceListComponent
    }

    , {
      path: "user-list",
      component: UserListComponent
    }

    , {
      path: "driver-list",
      component: DriverListComponent
    }
    , {
      path: "driver-detail/:user_id",
      component: DriverDetailComponent
    }

    , {
      path: "zone-add",
      component: ZoneAddComponent
    }
    , {
      path: "zone-list",
      component: ZoneListComponent
    }
    , {
      path: "zone-edit/:zone_id",
      component: ZoneEditComponent
    }
    , {
      path: "zone-service-price",
      component: ServicePriceListComponent
    }, {
      path: "zone-service-document",
      component: ServiceDocumentListComponent
    }, {
      path: "add-car",
      component: CarAddComponent
    }
    , {
      path: "car-brand",
      component: BrandListComponent
    }
    , {
      path: "car-model",
      component: ModelListComponent
    }
    , {
      path: "car-series",
      component: SeriesListComponent
    }

  ]
}, {
  path: '**',
  redirectTo: ""
},];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
