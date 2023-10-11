import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Docrenewalentrymodel } from '../models/docrenewalentrymodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Docrenewalentrylistmodel } from '../models/docrenewalentrylistmodel';

@Injectable({
  providedIn: 'root'
})
export class DocRenewalEntryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDocrenewalentry = new Docrenewalentrymodel();
  constructor(private httpClient: HttpClient) { }
  setDocRenewalEntryDetails(docrenewalmaster: Docrenewalentrymodel) {
 
      this.selectedDocrenewalentry = docrenewalmaster;
    
  
  }
  getDocrenewalEntryDetails() {
    return this.selectedDocrenewalentry;
  }
  clearDocrenewalEntryDetails() {
    this.selectedDocrenewalentry = new Docrenewalentrymodel();
  }
  docrenewalEntryDetailsSubmitted(user: Docrenewalentrymodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DocRenewalEntryDetailsSave', user, this.httpOptions);
  }
  getDocrenewalEntryList(filter: Filtermodel): Observable<Docrenewalentrylistmodel> {
    return this.httpClient.post<Docrenewalentrylistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDocRenewalEntryList', filter, this.httpOptions);
  }
}
