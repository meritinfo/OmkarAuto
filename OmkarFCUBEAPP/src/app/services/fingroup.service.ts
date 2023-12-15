import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Fingroupmodel } from '../models/fingroupmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Fingrouplistmodel } from '../models/fingrouplistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Requestmodel } from 'src/app/models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class FingroupService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedFingroup = new Fingroupmodel();
  constructor(private httpClient: HttpClient) { }
  setFinsgroupDetails(Fingroup: Fingroupmodel) { 

      this.selectedFingroup = Fingroup;   
  
  }
  getFingroupDetails() {
    return this.selectedFingroup;
  }

  clearFingroupDetails() {
    this.selectedFingroup = new Fingroupmodel();
  }

  fingroupDetailsSubmitted(Fingroupm: Fingroupmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/FinGroupMasterSave', Fingroupm, this.httpOptions);
  }

  getfingroupList(filter: Filtermodel): Observable<Fingrouplistmodel> {
    return this.httpClient.post<Fingrouplistmodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetFinGroupMasterList', filter, this.httpOptions);
  }
  
  chkActName(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/chkActName', request, this.httpOptions);
  }

  getaccounttypes():  Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetAccountTypeList', null, this.httpOptions);
  }
  getsubaccounttypes(request: Requestmodel ):  Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetSubAccountTypeList', request, this.httpOptions);
  }
  
  getschedulelist():  Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetScheduleList', null, this.httpOptions);
  }

  FinGroupDetailsDelete(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/FinGroupDetailsDelete', request, this.httpOptions);
  }
}
