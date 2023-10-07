import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Distancemastertripmodel } from '../models/distancemastertripmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class DistancemastertripService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }

  selectedDistancemastertripDetails = new Distancemastertripmodel();
  constructor(private httpClient: HttpClient) { }

  setDistancemastertripDetails(distancemastertripmodel: Distancemastertripmodel) {
    this.selectedDistancemastertripDetails = distancemastertripmodel;
  }
  getDistancemasterfreightDetails() {
    return this.selectedDistancemastertripDetails;
  }
  distanceMastertripSubmitted(distanceMaster: Distancemastertripmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/DistanceMasterTripSave', distanceMaster, this.httpOptions);
  }
}
