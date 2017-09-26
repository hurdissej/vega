import { BrowserXhr } from '@angular/http';
import { ProgressService, BroswerXhrWithProgress } from './../../services/progress-service';
import { PhotoService } from './../../services/photo.service';
import { Observable } from 'rxjs/Observable';
import { VehicleService } from './../../services/vehicle.service';
import { SaveVehicle, Vehicle, Contact } from './../../models/vehicle';

import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import * as _ from 'underscore';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
    providers: [
    VehicleService,
    PhotoService, 
    ProgressService,
  ]
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
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
  photos: any[];

  Id: number;


  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private ProgressService: ProgressService,
    private photoService: PhotoService
    ) { 
      route.params.subscribe(p => {
        this.Id = +p['id'];
      })
    }

  ngOnInit() {
    this.vehicleService.getVehicle(this.Id).subscribe(x => this.vehicle = x)
    this.photoService.getPhotos(this.Id).subscribe(res => {
      this.photos = res;
    });
  }

  uploadPhoto()
  {
    var nativeElement:HTMLInputElement = this.fileInput.nativeElement;

    this.ProgressService.uploadProgress
      .subscribe(progress => console.log(progress));

    this.photoService.upload(this.vehicle.id, nativeElement.files[0])
      .subscribe(photo => {
        this.photos.push(photo);
      })  
  }

}
