import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Lorryhirelistmodel  } from '../models/lorryhirelistmodel';
import { Lorryhiremastermodel } from '../models/lorryhiremastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Reportmodel } from '../models/reportmodel';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class LorryhirepmtService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedLorryhiremaster = new Lorryhiremastermodel();
  constructor(private httpClient: HttpClient) { }

  setLorryhiremasteretails(Lorryhiremaster: Lorryhiremastermodel) { 
      this.selectedLorryhiremaster = Lorryhiremaster; 
  }
  
  getLorryhiremasterDetails() {
    return this.selectedLorryhiremaster;
  }

  clearLorryhiremasterDetails() {
    this.selectedLorryhiremaster = new Lorryhiremastermodel();
  }

  lorryhiremasterSubmitted(Lorryhiremaster: Lorryhiremastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/LorryHireMasterSave', Lorryhiremaster, this.httpOptions);
  }

  getLorryhiremasterList(filter: Reportmodel): Observable<Lorryhirelistmodel> {
    return this.httpClient.post<Lorryhirelistmodel>(Constants.API_ENDPOINT + 'Consignment/GetLorryHirePaymentList', filter, this.httpOptions);
  }  

  getLorryhireInnerGridList(request: Requestmodel): Observable<Lorryhiremastermodel> {
    return this.httpClient.post<Lorryhiremastermodel>(Constants.API_ENDPOINT + 'Consignment/GetLorryHireInnerGrid', request, this.httpOptions);
  }

  getChallanLorryhireDetails(request: Reportmodel): Observable<Lorryhiremastermodel> {
    return this.httpClient.post<Lorryhiremastermodel>(Constants.API_ENDPOINT + 'Consignment/GetChallanLorryhireDetails', request, this.httpOptions);
  }   
  getLHChallanDetails(request: Requestmodel): Observable<Lorryhiremastermodel> {
    return this.httpClient.post<Lorryhiremastermodel>(Constants.API_ENDPOINT + 'Consignment/GetLHChallanDetails', request, this.httpOptions);
  } 
  checkChallanNoExists(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckChallanNoExists', request, this.httpOptions);
  }
  chkLHPMBrokerDisputeDetails(request: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChkLHPMBrokerDisputeDetails', request, this.httpOptions);
  } 
  
  lorryhiremasterDelete(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/LorryHireMasterDelete', request, this.httpOptions);
  }

  directPmtRev(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DirectPmtRev', request, this.httpOptions);
  }

  getLhpmPmtNo(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetLorryHirePmtNo', request, this.httpOptions);
  }
  
  getLorryHirePrintPdf(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetLorryHirePrintPdf', req, this.httpOptions);
  }
  
}
