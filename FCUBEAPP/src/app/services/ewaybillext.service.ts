import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Ewaybillextmodel } from '../models/ewaybillextmodel';
import { Ewaybillextlistmodel } from '../models/ewaybillextlistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from 'src/app/models/reportmodel';

@Injectable({
  providedIn: 'root'
})
export class EwaybillextService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedFingroup = new Ewaybillextmodel();
  constructor(private httpClient: HttpClient) { }
  
  setEwaybillextDetails(Fingroup: Ewaybillextmodel) { 
      this.selectedFingroup = Fingroup; 
  }
  
  getEwaybillextDetails() {
    return this.selectedFingroup;
  }

  clearEwaybillextDetails() {
    this.selectedFingroup = new Ewaybillextmodel();
  }

  ewaybillextDetailsSubmitted(Fingroupm: Ewaybillextmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/EWayBillExtend', Fingroupm, this.httpOptions);
  }

  getEwaybillextList(filter: Filtermodel): Observable<Ewaybillextlistmodel> {
    return this.httpClient.post<Ewaybillextlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetEWayBillExtList', filter, this.httpOptions);
  } 

  getEWayBillExtRptList(filter: Reportmodel): Observable<Ewaybillextlistmodel> {
    return this.httpClient.post<Ewaybillextlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetEWayBillExtRptList', filter, this.httpOptions);
  } 
  
  getKmsFromApi(filter: Dropdownmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetKmsFromApi', filter, this.httpOptions);
  } 

  getCurrentLocFromApi(filter: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetCurrentLocFromApi', filter, this.httpOptions);
  } 

  getEWayBillExtRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetEWayBillExtRptExcel', filter, this.httpOptions);
  }  
}
