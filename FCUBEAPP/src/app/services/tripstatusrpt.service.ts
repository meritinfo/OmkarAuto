import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Tripstatusrptlistmodel  } from 'src/app/models/tripstatusrptlistmodel';
import { Tripstatusrptmodel } from 'src/app/models/tripstatusrptmodel';

@Injectable({
  providedIn: 'root'
})
export class TripStatusRptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  getTripStatusRptList(filter: Reportmodel): Observable<Tripstatusrptlistmodel> {
    return this.httpClient.post<Tripstatusrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripStatusRptList', filter, this.httpOptions);
  }  
  getTripStatusRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelTripStatusRptList', filter, this.httpOptions);
  }    

}
