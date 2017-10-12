import { Vehicle } from './../models/vehicle';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthHttp } from "angular2-jwt/angular2-jwt";


@Injectable()
export class VehicleService {

  constructor(private http: Http, private authHttp: AuthHttp) { }

  delete(id){
    return this.http.delete('http://localhost:5000/api/vehicles/'+ id).map(res => res.json());
  }

  update(vehicle){
    return this.authHttp.put('http://localhost:5000/api/vehicles/' + vehicle.id, vehicle).map(res => res.json());
  }

  getVehicle(id){
    return this.http.get('http://localhost:5000/api/vehicles/' + id).map(res => res.json());
  }

  getAllVehicles(filter){
    return this.http.get('http://localhost:5000/api/vehicles' + '?' + this.toQueryString(filter))
      .map(res => res.json());
  }

  private toQueryString(obj){
    var parts = [];
    for(var property in obj) {
      var value = obj[property];
      if(value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value))
    }
    return parts.join('&');
  }

  getMakes() {
    return this.http.get('http://localhost:5000/api/makes').map(res => res.json());
  }

  getFeatures(){
    return this.authHttp.get('http://localhost:5000/api/features').map(res => res.json());
  }

  create(vehicle){
    return this.authHttp.post('http://localhost:5000/api/vehicles', vehicle).map(res => res.json());
  }


}
