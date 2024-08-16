
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Tyrepurchasemasterlistmodel } from '../models/tyrepurchasemastermodellist';
import { Tyremasterlistmodel } from '../models/tyremasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class TyremgntrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getTyrePurchaseRptList(filter: Reportmodel): Observable<Tyrepurchasemasterlistmodel> {
    return this.httpClient.post<Tyrepurchasemasterlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyrePurchaseRptList', filter, this.httpOptions);
  }  
  getTyrePurchaseRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyrePurchaseRptExcel', filter, this.httpOptions);
  }    
  getTyreStockRptList(filter: Reportmodel): Observable<Tyremasterlistmodel> {
    return this.httpClient.post<Tyremasterlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreStockRptList', filter, this.httpOptions);
  }  
  getTyreStockRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreStockRptExcel', filter, this.httpOptions);
  }       
  getTyreHistoryRptList(filter: Requestmodel): Observable<Tyremasterlistmodel> {
    return this.httpClient.post<Tyremasterlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreHistoryRptList', filter, this.httpOptions);
  }  
  getTyreHistoryRptExcel(filter: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreHistoryRptExcel', filter, this.httpOptions);
  }    
}
