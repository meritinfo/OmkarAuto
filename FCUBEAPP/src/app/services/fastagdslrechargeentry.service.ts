import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Finaccountmodel } from '../models/finaccountmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Fastagdslrechargeentrylistmodel } from '../models/fastagdslrechargeentrylistmodel';
import { Fastagdslrechargeentrymodel } from '../models/fastagdslrechargeentrymodel';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class FastagdslrechargeentryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedFastagdslrechargeentry = new Fastagdslrechargeentrymodel();
  constructor(private httpClient: HttpClient) { }
  setFastagdslrechargeentryDetails(FinAccount: Fastagdslrechargeentrymodel) { 
      this.selectedFastagdslrechargeentry = FinAccount;   
  }
  getFastagdslrechargeentrymodelDetails() {
    return this.selectedFastagdslrechargeentry;
  }
  clearFastagdslrechargeentryDetails() {
    this.selectedFastagdslrechargeentry = new Fastagdslrechargeentrymodel();
  }
 
  getFinsaccountsList(filter: Filtermodel): Observable<Fastagdslrechargeentrylistmodel> {
    return this.httpClient.post<Fastagdslrechargeentrylistmodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetFinAccountsMasterList', filter, this.httpOptions);
  }  
  getledgerList():  Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetFinActLedgertype', null, this.httpOptions);
  }
  fastagdslrechargeentrySubmitted(user: Fastagdslrechargeentrymodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/FastagDslRechargeEntrySave', user, this.httpOptions);
  }
  
  fastagdslrechargeentryDelete(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/FastagDslRechargeEntryDelete', request, this.httpOptions);
  }

  getFastagdslrechargeentryList(req:  Filtermodel): Observable<Fastagdslrechargeentrylistmodel> {
    return this.httpClient.post<Fastagdslrechargeentrylistmodel>(Constants.API_ENDPOINT + 'FleetTrans/FastagDslRechargeEntryList', req, this.httpOptions);
  }
  
  getRechargeTypeList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetRechargeTypeList', null, this.httpOptions);
  }
}
