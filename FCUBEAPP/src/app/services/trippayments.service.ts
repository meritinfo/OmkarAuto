import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Trippaymentsmodel } from '../models/trippaymentsmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Trippaymentslistmodel } from '../models/trippaymentslistmodel';
import { Requestmodel } from '../models/requestmodel';
import { Consignmentmodel } from '../models/consignmentmodel';
import { Reportmodel } from '../models/reportmodel';

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
  
  httpformOptions = {
    headers: new HttpHeaders({
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
  tripPaymentsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripPaymentsDelete', req, this.httpOptions);
  }
  tripPaymentsLoadDetails(req: Requestmodel): Observable<Reportmodel> {
    return this.httpClient.post<Reportmodel>(Constants.API_ENDPOINT + 'FleetTrans/TripPaymentsLoadDetails', req, this.httpOptions);
  }
  
  getTripPmtLoadShow(): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripPmtLoadShow', null, this.httpOptions);
  }
  trippaymentSaveSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripPaymentsSave', user, this.httpformOptions);
  }
  getTripPaymentsList(filter: Filtermodel): Observable<Trippaymentslistmodel> {
    return this.httpClient.post<Trippaymentslistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripPaymentsList', filter, this.httpOptions);
  }
  getLrDtlsForTripPmts(request: Requestmodel):Observable<Consignmentmodel> {
    return this.httpClient.post<Consignmentmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetLrDtlsForTripPmts', request, this.httpOptions);
  }
   getTransTypeValidation(request: Requestmodel):Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTransTypeValidations', request, this.httpOptions);
  }
}
