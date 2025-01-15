import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Distancemastertripmodel } from '../models/distancemastertripmodel';
import { Distancemastertriplistmodel } from '../models/distancemastertriplistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from '../models/reportmodel';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel' ;
import { Distancetripeditmodel } from 'src/app/models/distancetripeditmodel';

@Injectable({
  providedIn: 'root'
})
export class DistancemastertripService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedDistancemastertripDetails = new Distancemastertripmodel();
  constructor(private httpClient: HttpClient) { }

  setDistancemastertripDetails(distancemastertripmodel: Distancemastertripmodel) {
    this.selectedDistancemastertripDetails = distancemastertripmodel;
  }
  getDistancemastertripDetails() {
    return this.selectedDistancemastertripDetails;
  }
  distanceMastertripSubmitted(distanceMaster: Distancemastertripmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/DistanceMasterTripSave', distanceMaster, this.httpOptions);
  }
  clearDistanceMasterTripDetails() {
    this.selectedDistancemastertripDetails = new Distancemastertripmodel();
  }
  getDistanceMasterTripList(filter: Reportmodel): Observable<Distancemastertriplistmodel> {
    return this.httpClient.post<Distancemastertriplistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDistanceMasterTripList', filter, this.httpOptions);
  }
  distanceMasterTripDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/DistanceMasterTripDelete', req, this.httpOptions);
  }
  getFreightTripInnerGridList(request: Requestmodel): Observable<Distancemastertripmodel> {
    return this.httpClient.post<Distancemastertripmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetFreightTripInnerGridList', request, this.httpOptions);
  }
  chkdistanceTripValidity(user: Distancemastertripmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkdistanceTripValidity', user, this.httpOptions);
  }

  getFromLocationList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetDistanceTripFromLocationList', null, this.httpOptions);
  }
  getDistanceTripMasterDtls(req: Requestmodel): Observable<Distancetripeditmodel> {
    return this.httpClient.post<Distancetripeditmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDistanceTripDtls', req, this.httpOptions);
  }
  getDistanceTripDetails(distancefreightedit:Distancetripeditmodel): Observable<Distancetripeditmodel> {
    return this.httpClient.post<Distancetripeditmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDistanceTripEditDetails', distancefreightedit, this.httpOptions);
  }
  distanceTripEditSubmit(distancefreightedit:Distancetripeditmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/DistanceTripEditDetailsSave', distancefreightedit, this.httpOptions);
  }
}

