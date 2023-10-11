import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Trippaymentsmodel } from '../models/trippaymentsmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Trippaymentslistmodel } from '../models/trippaymentslistmodel';

@Injectable({
  providedIn: 'root'
})
export class TripPaymentsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedTripPayments = new Trippaymentsmodel();
  constructor(private httpClient: HttpClient) { }
  setTripPaymentsDetails(Trip: Trippaymentsmodel) {
 
      this.selectedTripPayments = Trip;
    
  
  }
  getTripPaymentsDetails() {
    return this.selectedTripPayments;
  }
  clearTripPaymentsDetails() {
    this.selectedTripPayments = new Trippaymentsmodel();
  }
  trippaymentDetailsSubmitted(user: Trippaymentsmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripPaymentsSave', user, this.httpOptions);
  }
  getTripPaymentsList(filter: Filtermodel): Observable<Trippaymentslistmodel> {
    return this.httpClient.post<Trippaymentslistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripPaymentsList', filter, this.httpOptions);
  }
}
