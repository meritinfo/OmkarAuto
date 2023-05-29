import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Docrenewalmastermodel } from '../models/docrenewalmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Docrenewalmasterlistmodel } from '../models/docrenewalmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class DocRenewalMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }
  selectedDocrenewalmaster = new Docrenewalmastermodel();
  constructor(private httpClient: HttpClient) { }
  setDocRenewalMasterDetails(docrenewalmaster: Docrenewalmastermodel) {
 
      this.selectedDocrenewalmaster = docrenewalmaster;
    
  
  }
  getDocrenewalMasterDetails() {
    return this.selectedDocrenewalmaster;
  }
  clearDocrenewalMasterDetails() {
    this.selectedDocrenewalmaster = new Docrenewalmastermodel();
  }
  docrenewalMasterDetailsSubmitted(user: Docrenewalmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/DocRenewalMasterSave', user, this.httpOptions);
  }
  getDocrenewalmasterList(filter: Filtermodel): Observable<Docrenewalmasterlistmodel> {
    return this.httpClient.post<Docrenewalmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetDocRenewalMasterList', filter, this.httpOptions);
  }
}
