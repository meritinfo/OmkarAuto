import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Distancemastertripmodel } from '../models/distancemastertripmodel';
import { Distancemastertriplistmodel } from '../models/distancemastertriplistmodel';
import { Responsemodel } from '../models/responsemodel';
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
}
