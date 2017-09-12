import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  providers: [
    VehicleService
  ]
})
export class VehicleListComponent implements OnInit {
  vehicles: any[];
  constructor(private vehicleService: VehicleService) {

   }

  ngOnInit() {
    this.populateVehicles();
  }

  private populateVehicles(){
    this.vehicleService.getAllVehicles().subscribe(result => {
      this.vehicles = result
      console.log(this.vehicles)
  })
  }

}
