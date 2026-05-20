import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Maintanencemastermodel } from '../models/maintanencemastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import {Maintanencemasterlistmodel } from '../models/maintanencemasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class MaintanenceMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedMaintanenceMaster = new Maintanencemastermodel();
  constructor(private httpClient: HttpClient) { }
  setMaintanenceMasterDetails(spareslubesmaster:Maintanencemastermodel) {
 
      this.selectedMaintanenceMaster = spareslubesmaster;
    
  
  }
  getMaintanenceMasterDetails() {
    return this.selectedMaintanenceMaster;
  }
  maintanenceMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/MaintanenceMasterDelete', req, this.httpOptions);
  }
  checkDuplicateMaintanence(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/CheckDuplicateMaintanence', req, this.httpOptions);
  }
  clearMaintanenceMasterDetails() {
    this.selectedMaintanenceMaster = new Maintanencemastermodel();
  }
  maintanenceMasterSubmitted(user:Maintanencemastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/MaintanenceMasterSave', user, this.httpOptions);
  }
  getmaintanenceMasterList(filter: Filtermodel): Observable<Maintanencemasterlistmodel> {
    return this.httpClient.post<Maintanencemasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetMaintanenceMasterList', filter, this.httpOptions);
  }
}