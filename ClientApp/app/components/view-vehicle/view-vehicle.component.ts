import { Observable } from 'rxjs/Observable';
import { VehicleService } from './../../services/vehicle.service';
import { SaveVehicle, Vehicle} from './../../models/vehicle';

import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
    providers: [
    VehicleService
  ]
})
export class ViewVehicleComponent implements OnInit {
  activeTab: 1;
  vehicle: Vehicle = {
    id: 0,
    make: {
      id:0,
      name: ''
    },
    model: { 
      id:0,
      name: ''},
    isRegistered: false,
    features: [],
      contact: {
        name: '',
        email: '',
        phone: '',
      },
      lastUpdate: ''
  };

  Id: number;


  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
    ) { 
      route.params.subscribe(p => {
        this.Id = +p['id'];
      })
    }

  ngOnInit() {
    this.vehicleService.getVehicle(this.Id).subscribe(x => this.vehicle = x)
  }

}
