import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Transportmastermodel } from '../models/transportmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import {Transportmasterlistmodel } from '../models/transportmasterlistmodel';
import {Transportmasterinnergridmodel } from '../models/transportmasterinnergridmodel';

@Injectable({
  providedIn: 'root'
})
export class TransportMasterService {

  httpOptions = {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedtransportmaster = new Transportmastermodel();
  constructor(private httpClient: HttpClient) { }
  setTransportMasterDetails(transportmaster:Transportmastermodel) {
 
      this.selectedtransportmaster =transportmaster;
    
  
  }
  getTransportMasterDetails() {
    return this.selectedtransportmaster;
  }
  clearTransportMasterDetails() {
    this.selectedtransportmaster = new Transportmastermodel();
  }
  transportMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/TransportMasterDelete', req, this.httpOptions);
  }
  getTransportMasterInnerGridList(request: Requestmodel): Observable<Transportmasterinnergridmodel> {
    return this.httpClient.post<Transportmasterinnergridmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetTransportMasterInnerGridList', request, this.httpOptions);
  }
 transportmasterSubmitted(user:FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/TransportMasterSave', user, this.httpOptions);
  }
  getTransportMasterList(filter: Filtermodel): Observable<Transportmasterlistmodel> {
    return this.httpClient.post<Transportmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetTransportMasterList', filter, this.httpOptions);
  }
}
