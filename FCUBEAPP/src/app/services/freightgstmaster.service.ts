import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Freightgstmastermodel } from '../models/freightgstmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from '../common/constants';
import { Freightgstmasterlistmodel } from '../models/freightgstmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class FreightGstMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedFreightGst = new Freightgstmastermodel();
  constructor(private httpClient: HttpClient) { }
  setFreightGstMasterDetails(Branch: Freightgstmastermodel) {
 
      this.selectedFreightGst = Branch;
    
  
  }
  getFreightGstMasterDetails() {
    return this.selectedFreightGst;
  }
  clearFreightGstMasterDetails() {
    this.selectedFreightGst = new Freightgstmastermodel();
  }
  FreightGstMasterSubmitted(user: Freightgstmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/FreightGstMasterSave', user, this.httpOptions);
  }
  getFreightgstmasterList(filter: Filtermodel): Observable<Freightgstmasterlistmodel> {
    return this.httpClient.post<Freightgstmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetFreightGstMasterList', filter, this.httpOptions);
  }
  checkDuplicateDesc(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateFreightDesc', req, this.httpOptions);
  }

  freightgstmasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/FreightGstMasterDelete', req, this.httpOptions);
  }

  chkCodeExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkCodeExits', request, this.httpOptions);
  }
  checkDuplicateBillType(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateBillType', req, this.httpOptions);
  }
  chkBranchNameExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkBranchNameExits', request, this.httpOptions);
  }
}
