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
export class VehicleInstPmtService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedvehicleinstpmt = new Vehicleinstpmtmodel();
  constructor(private httpClient: HttpClient) { }

  setVehicleInstPmtDetails(vehicleinstpmtmodel:Vehicleinstpmtmodel) {
    this.selectedvehicleinstpmt = vehicleinstpmtmodel;
  }
  getVehicleInstPmtDetails() {
    return this.selectedvehicleinstpmt;
  }
  vehicleInstPmtDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VehicleInstPmtMasterDelete', req, this.httpOptions);
  }
  checkDuplicateTyre(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/checkDuplicateTyre', req, this.httpOptions);
  }
  checkVehicleLoanType(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/checkVehicleLoanType', req, this.httpOptions);
  }
  clearVehicleInstPmtDetails() {
    this.selectedvehicleinstpmt = new Vehicleinstpmtmodel();
  }
  vehicleInstPmtSubmitted(user:Vehicleinstpmtmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VehicleInstPmtSave', user, this.httpOptions);
  }
  getVehicleInstPmtList(filter: Filtermodel): Observable<Vehicleinstpmtlistmodel> {
    return this.httpClient.post<Vehicleinstpmtlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleInstPmtMasterList', filter, this.httpOptions);
  }
}
