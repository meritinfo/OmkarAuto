import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Tyremodelmastermodel } from '../models/tyremodelmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import {Tyremodelmasterlistmodel } from '../models/tyremodelmasterlist';

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
  selectedtyremodelmaster = new Tyremodelmastermodel();
  constructor(private httpClient: HttpClient) { }
  setTyreModelMasterDetails(tyremodelmastermodel:Tyremodelmastermodel) {
 
      this.selectedtyremodelmaster = tyremodelmastermodel;
    
  
  }
  getTyreModelMasterDetails() {
    return this.selectedtyremodelmaster;
  }
  tyreModelMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/TyreModelMasterDelete', req, this.httpOptions);
  }
  checkDuplicateTyre(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/checkDuplicateTyre', req, this.httpOptions);
  }
  clearTyreModelMasterDetails() {
    this.selectedtyremodelmaster = new Tyremodelmastermodel();
  }
 tyreModelMasterSubmitted(user:Tyremodelmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/TyreModelSave', user, this.httpOptions);
  }
  getTyreModelMasterList(filter: Filtermodel): Observable<Tyremodelmasterlistmodel> {
    return this.httpClient.post<Tyremodelmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetTyreModelMasterList', filter, this.httpOptions);
  }
}
