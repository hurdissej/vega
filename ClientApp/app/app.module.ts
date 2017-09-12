import * as Raven from 'raven-js'
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ToastyModule } from 'ng2-toasty';
import { VehicleService } from './services/vehicle.service';

Raven
  .config('https://52391c4e6ace48659ffbda372fb794e0@sentry.io/212508')
  .install();

export const sharedConfig: NgModule = { 
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        VehicleFormComponent,
        VehicleListComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles', component: VehicleListComponent},
            { path: 'vehicles/new', component: VehicleFormComponent},
            { path: 'vehicles/:id', component: VehicleFormComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        VehicleService
    ]
};
