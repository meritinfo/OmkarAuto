import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Ratesmasternewmodel } from '../models/ratesmasternewmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import {Ratesmasternewlistmodel } from '../models/ratesmasternewlistmodel';

@Injectable({
  providedIn: 'root'
})
export class RatesMasterNewService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedratesmasternew = new Ratesmasternewmodel();
  constructor(private httpClient: HttpClient) { }
  ratesMasterNewDetails(spareslubesmaster:Ratesmasternewmodel) {
 
      this.selectedratesmasternew = spareslubesmaster;
    
  
  }
  getRatesMasterNewDetails() {
    return this.selectedratesmasternew;
  }
  ratesMasterNewDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/RatesMasterNewDelete', req, this.httpOptions);
  }
  
  checkDuplicateSpare(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/checkDuplicateSpares', req, this.httpOptions);
  }
  getRatesMasterNewInnerGridList(request: Requestmodel): Observable<Ratesmasternewmodel> {
    return this.httpClient.post<Ratesmasternewmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetRatesMasterNewInnerGridList', request, this.httpOptions);
  }
  clearRatesMasterNewDetails() {
    this.selectedratesmasternew = new Ratesmasternewmodel();
  }
  getBrandList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetBrandList', null, this.httpOptions);
  }
  
 ratesMasterNewSubmitted(user:Ratesmasternewmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/RatesMasterNewSave', user, this.httpOptions);
  }
  getRatesMasterNewList(filter: Filtermodel): Observable<Ratesmasternewlistmodel> {
    return this.httpClient.post<Ratesmasternewlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetRatesMasterNewList', filter, this.httpOptions);
  }
}
