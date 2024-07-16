import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from '../models/reportmodel';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }
  
  getOpeningBalanceRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetOpeningBalanceExcel', filter, this.httpOptions);
  }   
  getAsOnDateExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetAsOnDateExcel', filter, this.httpOptions);
  }   
  getAsOnDateDetailsExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetAsOnDateDetailsExcel', filter, this.httpOptions);
  }  
  getAsOnDateDetailsGroupExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetAsOnDateDetailsGroupExcel', filter, this.httpOptions);
  }   
  getGivenPeriodExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetGivenPeriodExcel', filter, this.httpOptions);
  }   
}