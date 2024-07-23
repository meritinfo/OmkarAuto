import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Mrmodel  } from '../models/mrmodel';
import { Mrlistmodel } from '../models/mrlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Pagerequestwithdatesmodel } from '../models/pagerequestwithdatesmodel';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Requestmodel } from '../models/requestmodel';
import { Reportmodel } from '../models/reportmodel';

@Injectable({
  providedIn: 'root'
})
export class MrService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedMr = new Mrmodel();
  constructor(private httpClient: HttpClient) { }

  setMrDetails(Fingroup: Mrmodel) { 
      this.selectedMr = Fingroup; 
  }  
  getMrDetails() {
    return this.selectedMr;
  }
  clearMrDetails() {
    this.selectedMr = new Mrmodel();
  }

  mrSubmitted(mr: Mrmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/MrMstSave', mr, this.httpOptions);
  }

  getMrMstList(filter: Pagerequestwithdatesmodel): Observable<Mrlistmodel> {
    return this.httpClient.post<Mrlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetMrMstList', filter, this.httpOptions);
  }  

  getMrInnerGridList(request: Requestmodel): Observable<Mrmodel> {
    return this.httpClient.post<Mrmodel>(Constants.API_ENDPOINT + 'Consignment/GetMrInnerGridList', request, this.httpOptions);
  }
  
  getOnAcMrSearchList(request: Dropdownmodel): Observable<Mrmodel> {
    return this.httpClient.post<Mrmodel>(Constants.API_ENDPOINT + 'Consignment/GetOnAcMrSearchList', request, this.httpOptions);
  }  
  
  getBillLRSearchDtls(request: Reportmodel): Observable<Mrmodel> {
    return this.httpClient.post<Mrmodel>(Constants.API_ENDPOINT + 'Consignment/GetBillLRSearchDtls', request, this.httpOptions);
  }  

  mrDelete(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/MrDelete', request, this.httpOptions);
  }
  
}
