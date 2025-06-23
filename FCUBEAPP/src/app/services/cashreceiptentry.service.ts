import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { bankreceiptentrymodel } from '../models/bankreceiptentrymodel';
import { Bankdocnofiltermodel } from 'src/app/models/bankdocnofiltermodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Cashbankfiltermodel } from 'src/app/models/cashbankfiltermodel';
import { Constants } from '../common/constants';
import { bankreceiptentrylistmodel } from '../models/bankreceiptentrylistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';

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
  selectedCashreceiptentry = new bankreceiptentrymodel();
  constructor(private httpClient: HttpClient) { }
  setCashReceiptEntryDetails(docrenewalmaster: bankreceiptentrymodel) { 
      this.selectedCashreceiptentry = docrenewalmaster;  
  }
  
  getCashReceiptEntryDetails() {
    return this.selectedCashreceiptentry;
  }
  clearCashReceiptEntryDetails() {
    this.selectedCashreceiptentry = new bankreceiptentrymodel();
  }
  cashReceiptEntryDetailsSubmitted(user: bankreceiptentrymodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/CashReceiptPaymentsSave', user, this.httpOptions);
  }
  getCashReceiptEntryList(filter: Cashbankfiltermodel): Observable<bankreceiptentrylistmodel> {
    return this.httpClient.post<bankreceiptentrylistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetCashReceiptPaymentsList', filter, this.httpOptions);
  }  
  getCashReceiptInnerGridList(req: Requestmodel): Observable<bankreceiptentrymodel> {
    return this.httpClient.post<bankreceiptentrymodel>(Constants.API_ENDPOINT + 'FinTrans/GetCashReceiptPaymentInnerGridList', req, this.httpOptions);
  }
  getDocNo(docNoFilter: Bankdocnofiltermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetNextDocNo', docNoFilter, this.httpOptions);
  }
  cashReceiptPaymentsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/CashReceiptPaymentsDelete', req, this.httpOptions);
  }

  getAccountList(req: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetCashBankAccountList', req, this.httpOptions);
  }
  getFinRefTypes(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetFinRefTypes', null, this.httpOptions);
  }  
  checkSubLedgerExists(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/CheckSubLedgerExists', req, this.httpOptions);
  }  
}
