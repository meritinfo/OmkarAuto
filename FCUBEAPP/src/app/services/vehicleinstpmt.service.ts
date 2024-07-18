import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Vehicleinstpmtmodel } from '../models/vehicleinstpmtmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import {Vehicleinstpmtlistmodel } from '../models/vehicleinstpmtlistmodel';

@Injectable({
  providedIn: 'root'
})
export class TyreModelMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedvehicleinstpmt = new Vehicleinstpmtmodel();
  constructor(private httpClient: HttpClient) { }
  setTyreModelMasterDetails(vehicleinstpmtmodel:Vehicleinstpmtmodel) {
 
      this.selectedvehicleinstpmt = vehicleinstpmtmodel;
    
  
  }
  getTyreModelMasterDetails() {
    return this.selectedvehicleinstpmt;
  }
  tyreModelMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/TyreModelMasterDelete', req, this.httpOptions);
  }
  checkDuplicateTyre(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/checkDuplicateTyre', req, this.httpOptions);
  }
//   clearTyreModelMasterDetails() {
//     this.selectedtyremodelmaster = new Tyremodelmastermodel();
//   }
//  tyreModelMasterSubmitted(user:Tyremodelmastermodel): Observable<Responsemodel> {
//     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/TyreModelSave', user, this.httpOptions);
//   }
//   getTyreModelMasterList(filter: Filtermodel): Observable<Tyremodelmasterlistmodel> {
//     return this.httpClient.post<Tyremodelmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetTyreModelMasterList', filter, this.httpOptions);
//   }
}
