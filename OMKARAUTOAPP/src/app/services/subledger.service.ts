import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subledgermodel } from '../models/subledgermodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Subledgerlistmodel } from '../models/subledgerlistmodel';

@Injectable({
  providedIn: 'root'
})
export class SubledgerService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }


  selectedSubledgerMaster = new Subledgermodel();
  constructor(private httpClient: HttpClient) { }


  setSubledgerDetails(tyremaster:Subledgermodel) {
      this.selectedSubledgerMaster = tyremaster;      
  }

  getSubLedgerMasterDetails() {
    return this.selectedSubledgerMaster;
  }
  clearSubledgerMasterDetails() {
    this.selectedSubledgerMaster = new Subledgermodel();
  }
  subLedgerMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/SubLedgerMasterDelete', req, this.httpOptions);
  }
//   chkSubledgerDuplicate(req: Requestmodel): Observable<Responsemodel> {
//     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ChkTyreNoDuplicate', req, this.httpOptions);
//   }
  getSubledgerMasterInnerGridList(request: Requestmodel): Observable<Subledgermodel> {
    return this.httpClient.post<Subledgermodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetSubLedgerMasterInnerGridList', request, this.httpOptions);
  }
  subledgerMasterSubmitted(user: Subledgermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/SubLedgerMasterSave', user, this.httpOptions);
  }
  getSubledgerMasterList(filter: Filtermodel): Observable<Subledgerlistmodel> {
    return this.httpClient.post<Subledgerlistmodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetSubLedgerMasterList', filter, this.httpOptions);
  }  
}
