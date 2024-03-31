import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Custwizardmodel } from '../models/custwizardmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Custwizardlistmodel } from '../models/custwizardlistmodel';
import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class CustwizardService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedCustWizardEntry = new Custwizardmodel();
  constructor(private httpClient: HttpClient) { }
  setCustWizardDetails(brandmaster: Custwizardmodel) {
 
      this.selectedCustWizardEntry = brandmaster;
    
  
  }
  getCustWizardDetails() {
    return this.selectedCustWizardEntry;
  }
  custWizardDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/CustWizardDelete', req, this.httpOptions);
  }
  clearCustWizardDetails() {
    this.selectedCustWizardEntry = new Custwizardmodel();
  }
  custWizardDetailsSubmitted(user: Custwizardmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/CustWizardSave', user, this.httpOptions);
  }
  getCustWizardList(filter: Filtermodel): Observable<Custwizardlistmodel> {
    return this.httpClient.post<Custwizardlistmodel>(Constants.API_ENDPOINT + 'FinTrans/CustWizardList', filter, this.httpOptions);
  }
}
