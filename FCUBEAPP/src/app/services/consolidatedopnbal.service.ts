import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Consolidateopenballistmodel } from '../models/consolidateopenballistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class ConsolidatedopnbalService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  getConsolidateOpeningBalGridList(req:Requestmodel): Observable<Consolidateopenballistmodel> {
    return this.httpClient.post<Consolidateopenballistmodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetConsolidateOpeningBalList', req, this.httpOptions);
  }

  updateConsolidateOpeningBal(req:Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/ConsolidateOpeningBalUpdate', req, this.httpOptions);
  }
  
  getConsolidateOpeningBalExcel(req:Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetConsolidateOpeningBalExcel', req, this.httpOptions);
  }
}
