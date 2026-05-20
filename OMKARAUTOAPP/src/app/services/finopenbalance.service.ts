import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Openingbalancemodel } from '../models/openingbalancemodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Openingbalancelistmodel } from '../models/openingbalancelistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Openingbalancerequestmodel } from 'src/app/models/openingbalancerequestmodel';

@Injectable({
  providedIn: 'root'
})
export class FinopenbalanceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedOpeningbalance = new Openingbalancemodel();
  constructor(private httpClient: HttpClient) { }

  setOpeningbalanceDetails(Openingbalance: Openingbalancemodel) { 
      this.selectedOpeningbalance = Openingbalance; 
  }
  
  getOpeningbalanceDetails() {
    return this.selectedOpeningbalance;
  }

  clearOpeningbalanceDetails() {
    this.selectedOpeningbalance = new Openingbalancemodel();
  }

  OpeningbalanceSubmitted(opbalmodel: Openingbalancemodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/OpeningBalanceSave', opbalmodel, this.httpOptions);
  }

  getOpeningbalanceList(filter: Filtermodel): Observable<Openingbalancelistmodel> {
    return this.httpClient.post<Openingbalancelistmodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetOpeningBalMasterList', filter, this.httpOptions);
  }

  getOpeningBalDetailList(filter: Openingbalancerequestmodel): Observable<Openingbalancemodel> {
    return this.httpClient.post<Openingbalancemodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetOpeningBalDetailList', filter, this.httpOptions);
  }
  deleteOpeningBalanceForm(filter: Openingbalancerequestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/OpeningBalanceDelete', filter, this.httpOptions);
  }
  getAccountList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetAccountList', null, this.httpOptions);
  }

}
