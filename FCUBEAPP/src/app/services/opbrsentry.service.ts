import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Brsentrymodel } from '../models/brsentrymodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { BrsEntrylistmodel } from '../models/brsentrylistmodel';
import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class OpbrsentryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedBrsEntry = new Brsentrymodel();
  constructor(private httpClient: HttpClient) { }
  setOpBrsEntryDetails(brandmaster: Brsentrymodel) {
 
      this.selectedBrsEntry = brandmaster;
    
  
  }
  getOpBrsEntryDetails() {
    return this.selectedBrsEntry;
  }
  opBrsEntryDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/OpBrsEntryDelete', req, this.httpOptions);
  }
  clearOpBrsEntryDetails() {
    this.selectedBrsEntry = new Brsentrymodel();
  }
  opBrsEntryDetailsSubmitted(user: Brsentrymodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/OpBrsEntrySave', user, this.httpOptions);
  }
  getBrsEntryDetailsList(filter: Filtermodel): Observable<BrsEntrylistmodel> {
    return this.httpClient.post<BrsEntrylistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetOpBrsEntryList', filter, this.httpOptions);
  }
}
