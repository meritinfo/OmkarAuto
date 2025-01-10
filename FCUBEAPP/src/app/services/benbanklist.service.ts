import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Benbankmodel } from '../models/benbankmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Reportmodel } from '../models/reportmodel';
import { Constants } from '../common/constants';
import { Benbanklistmodel } from '../models/./benbanklistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Requestmodel } from 'src/app/models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class BenBankListService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  
  httpformOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedBenBankMaster = new Benbankmodel();
  constructor(private httpClient: HttpClient) { }

  setBenBankListDetails(benbankmaster: Benbankmodel) { 
      this.selectedBenBankMaster = benbankmaster; 
  }

  getBenBankDetails() {
    return this.selectedBenBankMaster;
  }

  clearBenBankEntryDetails() {
    this.selectedBenBankMaster = new Benbankmodel();
  }

  
  checkDuplicateBank(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/CheckDuplicateBank', req, this.httpOptions);
  }

  benBankDetailsSubmitted(user: Benbankmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/BenBankListSave', user, this.httpformOptions);
  }

  getBenBankList(filter: Reportmodel): Observable<Benbanklistmodel> {
    return this.httpClient.post<Benbanklistmodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetBenBanksList', filter, this.httpOptions);
  }

  benBankDelete(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/BenBankListDelete', request, this.httpOptions);
  }

//   getDocRenewalList(): Observable<Dropdownmodel[]> {
//     return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMaster/GetDocRenewalList', null, this.httpOptions);
//   }

//   getPaymentCreditAcList(request: Requestmodel): Observable<Dropdownmodel[]> {
//     return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetPaymentCreditAcList', request, this.httpOptions);
//   }
}
