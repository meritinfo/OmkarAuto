import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { bankreceiptentrymodel } from '../models/bankreceiptentrymodel';
import { Bankreceiptpmtgridlistrequest } from '../models/bankreceiptpmtgridlistrequest';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { bankreceiptentrylistmodel } from '../models/bankreceiptentrylistmodel';

@Injectable({
  providedIn: 'root'
})
export class BankReceiptEntryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedBankreceiptentry = new bankreceiptentrymodel();
  constructor(private httpClient: HttpClient) { }
  setBankReceiptEntryDetails(docrenewalmaster: bankreceiptentrymodel) {
 
      this.selectedBankreceiptentry = docrenewalmaster;
    
  
  }
  getBankReceiptEntryDetails() {
    return this.selectedBankreceiptentry;
  }
  clearBankReceiptEntryDetails() {
  // this.selectedBankreceiptentry = new bankreceiptentrymodel();
  }
  bankReceiptEntryDetailsSubmitted(user: bankreceiptentrymodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/BankReceiptPaymentsSave', user, this.httpOptions);
  }
  getBankReceiptEntryList(filter: Filtermodel): Observable<bankreceiptentrylistmodel> {
    return this.httpClient.post<bankreceiptentrylistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetBankReceiptPaymentsList', filter, this.httpOptions);
  }
  getBankReceiptInnerGridList(request: Bankreceiptpmtgridlistrequest): Observable<bankreceiptentrymodel> {
    return this.httpClient.post<bankreceiptentrymodel>(Constants.API_ENDPOINT + 'FreightMasters/GetFreightTripInnerGridList', request, this.httpOptions);
  }
  
}
