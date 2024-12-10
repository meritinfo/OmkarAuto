import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Driversalarypaymentmodel } from '../models/driversalarypaymentmodel';
import { Driversalarysearchlistrequestmodel } from '../models/driversalarysearchlistrequestmodel';
import { Driversalarysearchlistmodel } from '../models/driversalarysearchlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Driversalarylistmodel } from '../models/driversalarypaymentlist';

import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class DriversalarypaymentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDriverSalaryPayment = new Driversalarypaymentmodel();
  constructor(private httpClient: HttpClient) { }
  setDriverSalaryDetails(Driver: Driversalarypaymentmodel) {
 
      this.selectedDriverSalaryPayment = Driver;
    
  
  }
  getDriverSalaryPaymentDetails() {
    return this.selectedDriverSalaryPayment;
  }
  
  clearDriverSalaryPaymentDetails() {
    this.selectedDriverSalaryPayment = new Driversalarypaymentmodel();
  }
  driverSalaryStatementDetailsSubmitted(user: Driversalarypaymentmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripPaymentsSave', user, this.httpOptions);
  }
  getDriverSalaryPaymentList(filter: Filtermodel): Observable<Driversalarylistmodel> {
    return this.httpClient.post<Driversalarylistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDriverSalaryPaymentList', filter, this.httpOptions);
  }
  driverSalaryPayementSubmitted(user: Driversalarypaymentmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DriverSalaryPaymentSave', user, this.httpOptions);
  }
  driverSalaryPayementDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DriverSalaryPaymentDelete', req, this.httpOptions);
  }
  
  
}
