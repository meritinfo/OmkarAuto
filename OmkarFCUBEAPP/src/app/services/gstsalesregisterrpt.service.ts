import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Gstsalesrptlistmodel  } from 'src/app/models/gstsalesregisterrptlistmodel';
import { Gstsalesregisterrptmodel } from 'src/app/models/gstsalesregisterrptmodel';

@Injectable({
  providedIn: 'root'
})
export class GstsalesregisterrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getGstSalesRegisterrptList(filter: Reportmodel): Observable<Gstsalesrptlistmodel> {
    return this.httpClient.post<Gstsalesrptlistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetGstSalesRegisterRptList', filter, this.httpOptions);
  }  
  getGstSalesRegisterrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetGstSalesRegisterExcel', filter, this.httpOptions);
  } 
 // getGstSalesRegisterrptPdf(filter: Reportmodel): Observable<Responsemodel> {
   // return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetLedgerRptPdf', filter, this.httpOptions);
 // } 
  getGstSalesRegisterRptList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans//api/FinTrans/GetGstSalesRegisterRptList', null, this.httpOptions);
  }    

}
