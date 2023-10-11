import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Consignmentmodel } from '../models/consignmentmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Consignmentlistmodel } from '../models/consignmentlistmodel';

@Injectable({
  providedIn: 'root'
})
export class ConsignmentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedConsignment = new Consignmentmodel();
  constructor(private httpClient: HttpClient) { }
  setConsignmentDetails(consignment: Consignmentmodel) {
 
      this.selectedConsignment = consignment;
    
  
  }
  getConsignmentDetails() {
    return this.selectedConsignment;
  }
  clearConsignmentDetails() {
    this.selectedConsignment = new Consignmentmodel();
  }
  consignmentDetailsSubmitted(user: Consignmentmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ConsignmentSave', user, this.httpOptions);
  }
  consignmentTripDetailsSubmitted(user: Consignmentmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ConsignmentTripSave', user, this.httpOptions);
  }
  getConsignmentList(filter: Filtermodel): Observable<Consignmentlistmodel> {
    return this.httpClient.post<Consignmentlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetConsignmentList', filter, this.httpOptions);
  }
}
