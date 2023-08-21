import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Distancemasterfreightmodel } from '../models/distancemasterfreightmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class DistancemasterfreightmasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }

  selectedDistancemasterfreightDetails = new Distancemasterfreightmodel();
  constructor(private httpClient: HttpClient) { }

  setDistancemasterfreightDetails(distancemasterfreightmodel: Distancemasterfreightmodel) {
    this.selectedDistancemasterfreightDetails = distancemasterfreightmodel;
  }
  getDistancemasterfreightDetails() {
    return this.selectedDistancemasterfreightDetails;
  }
  distanceMasterFreightSubmitted(distanceMaster: Distancemasterfreightmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/DistanceMasterFrtSave', distanceMaster, this.httpOptions);
  }
}
