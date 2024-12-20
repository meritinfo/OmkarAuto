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
export class BankbookrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getBankBookrptList(filter: Reportmodel): Observable<Ledgerrptlistmodel> {
    return this.httpClient.post<Ledgerrptlistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetBankBookRptList', filter, this.httpOptions);
  }  

  getBankBookrptPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetBankBookRptPdf', filter, this.httpOptions);
  } 
  getBankBookrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetBankBookRptExcel', filter, this.httpOptions);
  } 
}
