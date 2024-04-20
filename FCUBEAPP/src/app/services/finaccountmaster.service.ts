import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Finaccountmodel } from '../models/finaccountmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Finaccountlistmodel } from '../models/finaccountlistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class FinsaccountmasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedFinaccounts = new Finaccountmodel();
  constructor(private httpClient: HttpClient) { }
  setFinsaccountsDetails(FinAccount: Finaccountmodel) { 
      this.selectedFinaccounts = FinAccount;   
  }
  getFinsaccountsDetails() {
    return this.selectedFinaccounts;
  }
  clearFinsaccountsDetails() {
    this.selectedFinaccounts = new Finaccountmodel();
  }
  finsaccountsDetailsSubmitted(user: Finaccountmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/FinAccountsMasterSave', user, this.httpOptions);
  }
  getFinsaccountsList(filter: Filtermodel): Observable<Finaccountlistmodel> {
    return this.httpClient.post<Finaccountlistmodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetFinAccountsMasterList', filter, this.httpOptions);
  }  
  getledgerList():  Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetFinActLedgertype', null, this.httpOptions);
  }
}
