import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Hrmastermodel } from '../models/hrmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Hrmasterlistmodel } from '../models/hrmasterlistmodel';

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
  hrmasterDetailsSubmitted(user: Hrmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Admin/HrMasterSave', user, this.httpOptions);
  }
  getHrMasterList(filter: Filtermodel): Observable<Hrmasterlistmodel> {
    return this.httpClient.post<Hrmasterlistmodel>(Constants.API_ENDPOINT + 'Admin/getHrMasterList', filter, this.httpOptions);
  }
}
