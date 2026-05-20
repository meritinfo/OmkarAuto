import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Driversalaryentrymodel } from '../models/driversalaryentrymodel';
import { Driversalarysearchlistrequestmodel } from '../models/driversalarysearchlistrequestmodel';
import { Driversalarysearchlistmodel } from '../models/driversalarysearchlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Driversalaryentrylistmodel } from '../models/driversalaryentrylist';

import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class DriverSalaryEntryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDriverSalaryEntry = new Driversalaryentrymodel();
  constructor(private httpClient: HttpClient) { }
  setDriverSalaryDetails(Driver: Driversalaryentrymodel) {
 
      this.selectedDriverSalaryEntry = Driver;
    
  
  }
  getDriverSalaryEntryDetails() {
    return this.selectedDriverSalaryEntry;
  }
  
  clearDriverSalaryEntryDetails() {
    this.selectedDriverSalaryEntry = new Driversalaryentrymodel();
  }
  driverSalaryStatementDetailsSubmitted(user: Driversalaryentrymodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripPaymentsSave', user, this.httpOptions);
  }
  getDriverSalaryEntryList(filter: Filtermodel): Observable<Driversalaryentrylistmodel> {
    return this.httpClient.post<Driversalaryentrylistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDriverSalaryEntryList', filter, this.httpOptions);
  }
  driverSalaryEntrySubmitted(user: Driversalaryentrymodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DriverSalaryEntrySave', user, this.httpOptions);
  }
  driverSalaryEntryDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DriverSalaryEntryDelete', req, this.httpOptions);
  }
  
  
}
