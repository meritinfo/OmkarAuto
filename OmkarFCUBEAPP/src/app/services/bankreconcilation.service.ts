import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Bankreconcilationmodel } from '../models/bankreconcilationmodel';
import { Bankreconcilationlist } from '../models/bankreconcilationlist';
import { Bankrecfiltermodel } from 'src/app/models/bankrecfiltermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class BankreconcilationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  getbankacList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetBankacList', null, this.httpOptions);
  }
  getBankReconcileGridList(filter:Bankrecfiltermodel): Observable<Bankreconcilationlist> {
    return this.httpClient.post<Bankreconcilationlist>(Constants.API_ENDPOINT + 'FinTrans/GetBankReconcileGridList', filter, this.httpOptions);
  }
  bankreconcilationSubmitted(bankrecList:Bankreconcilationlist): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/BankReconcilationSave', bankrecList, this.httpOptions);
  }
}
