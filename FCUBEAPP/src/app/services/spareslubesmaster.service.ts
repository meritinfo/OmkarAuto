import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Spareslubesmastermodel } from '../models/sparelubesmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import {Spareslubesmasterlistmodel } from '../models/spareslubesmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class SparesLubesMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedspareslubesmaster = new Spareslubesmastermodel();
  constructor(private httpClient: HttpClient) { }
  setSparesLubesMasterDetails(spareslubesmaster:Spareslubesmastermodel) {
 
      this.selectedspareslubesmaster = spareslubesmaster;
    
  
  }
  getSparesLubesMasterDetails() {
    return this.selectedspareslubesmaster;
  }
  sparesLubesMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/SparesLubesMasterDelete', req, this.httpOptions);
  }
  checkDuplicateSpare(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/checkDuplicateSpares', req, this.httpOptions);
  }
  clearSparesLubesMasterDetails() {
    this.selectedspareslubesmaster = new Spareslubesmastermodel();
  }
 sparesLubesMasterSubmitted(user:Spareslubesmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/SparesLubesMasterSave', user, this.httpOptions);
  }
  getSparesLubesMasterList(filter: Filtermodel): Observable<Spareslubesmasterlistmodel> {
    return this.httpClient.post<Spareslubesmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetSparesLubesMasterList', filter, this.httpOptions);
  }
}
