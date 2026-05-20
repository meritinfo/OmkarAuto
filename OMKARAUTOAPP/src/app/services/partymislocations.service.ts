import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Partymislocationmodel } from '../models/partymislocationsmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import {Partymislocationlistmodel } from '../models/partymislocationslist';

@Injectable({
  providedIn: 'root'
})
export class PartyMisLocationsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedpartymislocation = new Partymislocationmodel();
  constructor(private httpClient: HttpClient) { }
  partyMisLocationDetails(spareslubesmaster:Partymislocationmodel) {
 
      this.selectedpartymislocation = spareslubesmaster;
    
  
  }
  getPartyMisLocationDetails() {
    return this.selectedpartymislocation;
  }
  partyMisLocationDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/PartyMisLocationDelete', req, this.httpOptions);
  }

  checkDuplicateLocation(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateLocation', req, this.httpOptions);
  }
  
  checkDuplicateparty(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/checkDuplicateSpares', req, this.httpOptions);
  }
  getPartyMisLocationInnerGridList(request: Requestmodel): Observable<Partymislocationmodel> {
    return this.httpClient.post<Partymislocationmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetPartyMisLocationInnerGridList', request, this.httpOptions);
  }
  clearPartyMisLocationDetails() {
    this.selectedpartymislocation = new Partymislocationmodel();
  }
  getBrandList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetBrandList', null, this.httpOptions);
  }
  
 partymislocationSubmitted(user:Partymislocationmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/PartyMisLocationSave', user, this.httpOptions);
  }
  getPartyMisLocationList(filter: Filtermodel): Observable<Partymislocationlistmodel> {
    return this.httpClient.post<Partymislocationlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetPartyMisLocationList', filter, this.httpOptions);
  }
}
