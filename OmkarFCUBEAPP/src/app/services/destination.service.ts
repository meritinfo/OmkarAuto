import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Destinationmodel } from '../models/destinationmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Destinationlistmodel } from '../models/destinationlistmodel';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDestination = new Destinationmodel();
  constructor(private httpClient: HttpClient) { }
  setDestinationDetails(Destination: Destinationmodel) {
 
      this.selectedDestination = Destination;
    
  
  }
  getDestinationDetails() {
    return this.selectedDestination;
  }
  clearDestinationDetails() {
    this.selectedDestination = new Destinationmodel();
  }
  destinationDetailsSubmitted(user: Destinationmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/DestinationMasterDetailsSave', user, this.httpOptions);
  }
  getDestinationList(filter: Filtermodel): Observable<Destinationlistmodel> {
    return this.httpClient.post<Destinationlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDestinationMasterList', filter, this.httpOptions);
  }
}
