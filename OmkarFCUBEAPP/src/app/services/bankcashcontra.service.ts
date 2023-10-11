import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { bankreceiptentrymodel } from '../models/bankreceiptentrymodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { bankreceiptentrylistmodel } from '../models/bankreceiptentrylistmodel';

@Injectable({
  providedIn: 'root'
})
export class BankCashContraService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedBankCashContra = new bankreceiptentrymodel();
  constructor(private httpClient: HttpClient) { }
  setCashReceiptEntryDetails(docrenewalmaster: bankreceiptentrymodel) {
 
      this.selectedBankCashContra = docrenewalmaster;
    
  
  }
  getBankCashContraDetails() {
    return this.selectedBankCashContra;
  }
  clearBankCashContraDetails() {
  //  this.selectedBankreceiptentry = new bankreceiptentrymodel();
  }
  bankCashContraDetailsSubmitted(user: bankreceiptentrymodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/BankCashContraSave', user, this.httpOptions);
  }
  bankCashContraEntryList(filter: Filtermodel): Observable<bankreceiptentrylistmodel> {
    return this.httpClient.post<bankreceiptentrylistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetBankCashContraList', filter, this.httpOptions);
  }
}
