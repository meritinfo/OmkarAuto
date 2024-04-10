import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Ledgerrptlistmodel  } from 'src/app/models/ledgerrptlistmodel';
import { Ledgerrptmodel } from 'src/app/models/ledgerrptmodel';

@Injectable({
  providedIn: 'root'
})
export class LedgerrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  selectedLedgerrptmodel = new Ledgerrptmodel();
  constructor(private httpClient: HttpClient) { }
  
  setDailyloadingrptDetails(ledgerrptmodel: Ledgerrptmodel) { 
      this.selectedLedgerrptmodel = ledgerrptmodel;  
  }
  
  getLedgerrptDetails() {
    return this.selectedLedgerrptmodel;
  }

  getLedgerrptList(filter: Reportmodel): Observable<Ledgerrptlistmodel> {
    return this.httpClient.post<Ledgerrptlistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetLedgerRptList', filter, this.httpOptions);
  }  
  getLedgerrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetLedgerRptExcel', filter, this.httpOptions);
  } 
  getLedgerrptPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetLedgerRptPdf', filter, this.httpOptions);
  } 
  getLedgerList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetLedgerList', null, this.httpOptions);
  }    

}
