import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Distancemastertripmodel } from '../models/distancemastertripmodel';
import { FreighttripInnergridlistrequest } from '../models/freighttripInnergridlistrequest';
import { Distancemastertriplistmodel } from '../models/distancemastertriplistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';

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
  getDistanceMasterTripList(filter: Filtermodel): Observable<Distancemastertriplistmodel> {
    return this.httpClient.post<Distancemastertriplistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDistanceMasterTripList', filter, this.httpOptions);
  }
  distanceMasterTripDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/DistanceMasterTripDelete', req, this.httpOptions);
  }
  getFreightTripInnerGridList(request: FreighttripInnergridlistrequest): Observable<Distancemastertripmodel> {
    return this.httpClient.post<Distancemastertripmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetFreightTripInnerGridList', request, this.httpOptions);
  }
  chkdistanceTripValidity(user: Distancemastertripmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkdistanceTripValidity', user, this.httpOptions);
  }
}
