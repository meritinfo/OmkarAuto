import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {TripexptypemasterModel } from '../models/tripexptypemastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import {Tripexptypemasterlistmodel } from '../models/tripexptypemasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class TripExpTypeMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedTripExpTypeMaster = new TripexptypemasterModel();
  constructor(private httpClient: HttpClient) { }
  setTripExpTypeMasterDetails(spareslubesmaster:TripexptypemasterModel) {
 
      this.selectedTripExpTypeMaster = spareslubesmaster;
    
  
  }
  getTripExpTypeMasterDetails() {
    return this.selectedTripExpTypeMaster;
  }
  tripExpTypeMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/TripExpTypeMasterDelete', req, this.httpOptions);
  }
  checkExpTypeMaster(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/CheckDuplicateTripExpType', req, this.httpOptions);
  }
  clearCheckTripExpMasterDetails() {
    this.selectedTripExpTypeMaster = new TripexptypemasterModel();
  }
  checkTripExpTypeMasterSubmitted(user:TripexptypemasterModel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/TripExpTypeMasterSave', user, this.httpOptions);
  }
  getTripExpTypeMasterList(filter: Filtermodel): Observable<Tripexptypemasterlistmodel> {
    return this.httpClient.post<Tripexptypemasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetTripExpTypeMasterList', filter, this.httpOptions);
  }
}