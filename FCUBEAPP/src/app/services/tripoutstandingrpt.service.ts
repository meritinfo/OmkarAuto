import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Tripoutstandingrptlistmodel  } from 'src/app/models/tripoutstandingrptlistmodel';

@Injectable({
  providedIn: 'root'
})
export class TripoutstandingrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  getTripOutstandingRptList(filter: Reportmodel): Observable<Tripoutstandingrptlistmodel> {
    return this.httpClient.post<Tripoutstandingrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripOutstandingRptList', filter, this.httpOptions);
  }  
  getTripOutstandingRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelTripOutstandingRptList', filter, this.httpOptions);
  }    

}

