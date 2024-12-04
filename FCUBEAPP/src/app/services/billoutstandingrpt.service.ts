import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from 'src/app/models/reportmodel';

@Injectable({
  providedIn: 'root'
})
export class BilloutstandingrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getAgeingSummRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAgeingSummRptExcel', filter, this.httpOptions);
  } 
  getAgeingSummBranchRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAgeingSummBranchRptExcel', filter, this.httpOptions);
  }
  getAgeingSummPartyRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAgeingSummPartyRptExcel', filter, this.httpOptions);
  }
  getAgeingDetailRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAgeingDetailRptExcel', filter, this.httpOptions);
  }
  getOutStandingSummRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOutStandingSummRptExcel', filter, this.httpOptions);
  }
  getOutStandingDetailRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOutstandingDetailRptExcel', filter, this.httpOptions);
  }
  getOutstandingAnalysisRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOutstandingAnalysisRptExcel', filter, this.httpOptions);
  }
}
