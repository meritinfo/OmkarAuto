import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Lorryhirereqlistmodel  } from '../models/lorryhirereqlistmodel';
import { Lorryhirereqmodel } from '../models/lorryhirereqmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Reportmodel } from '../models/reportmodel';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class LorryhirereqService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  httpformOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  selectedLorryhireReq = new Lorryhirereqmodel();
  constructor(private httpClient: HttpClient) { }

  setLorryhireReqDetails(LorryhireReq: Lorryhirereqmodel) { 
      this.selectedLorryhireReq = LorryhireReq; 
  }
  
  getLorryhireReqDetails() {
    return this.selectedLorryhireReq;
  }

  clearLorryhireReqDetails() {
    this.selectedLorryhireReq = new Lorryhirereqmodel();
  }

  lorryhireReqSubmitted(LorryhireReq: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/LorryHireReqSave', LorryhireReq, this.httpformOptions);
  }

  getLorryhireReqList(filter: Reportmodel): Observable<Lorryhirereqlistmodel> {
    return this.httpClient.post<Lorryhirereqlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetLorryHireReqList', filter, this.httpOptions);
  }  

  lorryhireReqDelete(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/LorryHireReqDelete', request, this.httpOptions);
  }  
 
  getChallanDetails(request: Requestmodel ):  Observable<Lorryhirereqmodel> {
    return this.httpClient.post<Lorryhirereqmodel>(Constants.API_ENDPOINT + 'Consignment/GetChallanDetails', request, this.httpOptions);
  }  

  lorryhireAprvSubmitted(LorryhireReq: Lorryhirereqmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/LorryHireAprvSave', LorryhireReq, this.httpOptions);
  }

  getLorryhireAprvList(filter: Reportmodel): Observable<Lorryhirereqlistmodel> {
    return this.httpClient.post<Lorryhirereqlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetLorryHireAprvList', filter, this.httpOptions);
  }  

  lorryhireAprvDelete(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/LorryHireAprvDelete', request, this.httpOptions);
  }  
 
}
