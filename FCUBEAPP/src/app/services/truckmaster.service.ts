import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Truckmastermodel } from '../models/truckmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import {Truckmasterlistmodel } from '../models/truckmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class TruckMasterService {

  httpOptions = {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedtruckmaster = new Truckmastermodel();
  constructor(private httpClient: HttpClient) { }
  setTruckMasterDetails(truckmaster:Truckmastermodel) {
 
      this.selectedtruckmaster =truckmaster;
    
  
  }
  getTruckMasterDetails() {
    return this.selectedtruckmaster;
  }
  clearTruckMasterDetails() {
    this.selectedtruckmaster = new Truckmastermodel();
  }
 truckmasterSubmitted(user:FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/TruckMasterSave', user, this.httpOptions);
  }
  getTruckMasterList(filter: Filtermodel): Observable<Truckmasterlistmodel> {
    return this.httpClient.post<Truckmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetTruckMasterList', filter, this.httpOptions);
  }
}
