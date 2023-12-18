import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Driversalarystatementmodel } from '../models/driversalarystatementmodel';
import { Driversalarysearchlistrequestmodel } from '../models/driversalarysearchlistrequestmodel';
import { Driversalarysearchlistmodel } from '../models/driversalarysearchlistmodel';
import { Driversalaryinnergridrequest } from '../models/driversalaryinnergridrequest';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Trippaymentslistmodel } from '../models/trippaymentslistmodel';
import { Driversalarystatementlistmodel } from '../models/driversalarystatementlistmodel';

@Injectable({
  providedIn: 'root'
})
export class DriversalarystatementService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDriverSalaryStatement = new Driversalarystatementmodel();
  constructor(private httpClient: HttpClient) { }
  setDriverSalaryDetails(Driver: Driversalarystatementmodel) {
 
      this.selectedDriverSalaryStatement = Driver;
    
  
  }
  getDriverSalaryStatementDetails() {
    return this.selectedDriverSalaryStatement;
  }
  getDriverSalarySearchList(request: Driversalarysearchlistrequestmodel): Observable<Driversalarysearchlistmodel> {
    return this.httpClient.post<Driversalarysearchlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDriverSalarySearchList', request, this.httpOptions);
  }
  clearDriverSalaryStatementDetails() {
    this.selectedDriverSalaryStatement = new Driversalarystatementmodel();
  }
  driverSalaryStatementDetailsSubmitted(user: Driversalarystatementmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripPaymentsSave', user, this.httpOptions);
  }
  getDriverSalaryStatementList(filter: Filtermodel): Observable<Driversalarystatementlistmodel> {
    return this.httpClient.post<Driversalarystatementlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDriverSalaryStmtList', filter, this.httpOptions);
  }
  saveDriverSalaryDetails(request: Driversalarystatementmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/SaveDriverSalaryStatementDetails', request, this.httpOptions);
  }
  getDriverSalaryInnerGridList(request: Driversalaryinnergridrequest): Observable<Driversalarysearchlistmodel> {
    return this.httpClient.post<Driversalarysearchlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDriverSalaryInnerGridList', request, this.httpOptions);
  }
  
}
