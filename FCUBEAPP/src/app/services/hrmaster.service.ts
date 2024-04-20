import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Hrmastermodel } from '../models/hrmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Hrmasterlistmodel } from '../models/hrmasterlistmodel';
import { Requestmodel } from 'src/app/models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class HrMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedHrmaster = new Hrmastermodel();
  constructor(private httpClient: HttpClient) { }
  setHrmasterDetails(roletypes: Hrmastermodel) {
 
      this.selectedHrmaster = roletypes;
    
  
  }
  getHrmasterDetails() {
    return this.selectedHrmaster;
  }
  clearHrmasterDetails() {
    this.selectedHrmaster = new Hrmastermodel();
  }

  hrMasterDelete(req:Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/HrMasterDelete', req, this.httpOptions);
  }
  chkHrcode(req:Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/CheckHrcode', req, this.httpOptions);
  }

  hrmasterDetailsSubmitted(user: Hrmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/HrMasterSave', user, this.httpOptions);
  }

  getHrMasterList(filter: Filtermodel): Observable<Hrmasterlistmodel> {
    return this.httpClient.post<Hrmasterlistmodel>(Constants.API_ENDPOINT + 'HRMaster/getHrMasterList', filter, this.httpOptions);
  }
}
