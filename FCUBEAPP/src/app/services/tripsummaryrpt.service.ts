import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Tripsummaryrptlistmodel  } from 'src/app/models/tripsummaryrptlistmodel';

@Injectable({
  providedIn: 'root'
})
export class TripsummaryrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  getTripSummaryRptList(filter: Reportmodel): Observable<Tripsummaryrptlistmodel> {
    return this.httpClient.post<Tripsummaryrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripSummaryRptList', filter, this.httpOptions);
  }  
  getTripSummaryRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelTripSummaryRptList', filter, this.httpOptions);
  }    

}


