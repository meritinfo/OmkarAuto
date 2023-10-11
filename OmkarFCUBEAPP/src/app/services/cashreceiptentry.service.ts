import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Cashreceiptentrymodel } from '../models/cashreceiptentrymodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Cashreceiptentrylistmodel } from '../models/cashreceiptentrylistmodel';

@Injectable({
  providedIn: 'root'
})
export class CashReceiptEntryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedCashreceiptentry = new Cashreceiptentrymodel();
  constructor(private httpClient: HttpClient) { }
  setCashReceiptEntryDetails(docrenewalmaster: Cashreceiptentrymodel) {
 
      this.selectedCashreceiptentry = docrenewalmaster;
    
  
  }
  getCashReceiptEntryDetails() {
    return this.selectedCashreceiptentry;
  }
  clearCashReceiptEntryDetails() {
    this.selectedCashreceiptentry = new Cashreceiptentrymodel();
  }
  cashReceiptEntryDetailsSubmitted(user: Cashreceiptentrymodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/CashReceiptPaymentsSave', user, this.httpOptions);
  }
  getCashReceiptEntryList(filter: Filtermodel): Observable<Cashreceiptentrylistmodel> {
    return this.httpClient.post<Cashreceiptentrylistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetCashReceiptPaymentsList', filter, this.httpOptions);
  }
}
