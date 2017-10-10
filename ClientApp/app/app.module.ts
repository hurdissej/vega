import { AdminComponent } from './components/Admin/admin.component';
import { AuthService } from './services/auth.service';
import { BrowserXhrWithProgress, ProgressService } from './services/progress-service';
import { BrowserXhr } from '@angular/http';
import { PhotoService } from './services/photo.service';
import * as Raven from 'raven-js';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { ToastyModule } from 'ng2-toasty';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { VehicleService } from './services/vehicle.service';

import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";

Raven
  .config('https://52391c4e6ace48659ffbda372fb794e0@sentry.io/212508')
  .install();

export const sharedConfig: NgModule = { 
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        PaginationComponent,
        VehicleFormComponent,
        VehicleListComponent,
        ViewVehicleComponent,
        AdminComponent

    ],
    providers: [
        VehicleService,
        PhotoService,
        {provide: BrowserXhr, useClass: BrowserXhrWithProgress},
        AuthService,
        ProgressService,
    ],
    imports: [
        FormsModule,
        NgbModule.forRoot(),
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles', component: VehicleListComponent},
            { path: 'vehicles/new', component: VehicleFormComponent},
            { path: 'admin', component: AdminComponent},
            { path: 'vehicles/:id', component: ViewVehicleComponent},
            { path: 'vehicles/edit/:id', component: VehicleFormComponent}
        ])
    ],

};
