import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Constants } from '../common/constants';
import { Challanlistmodel } from '../models/challanlistmodel';
import { Challanmastermodel } from '../models/challanmastermodel';
import { Dropdownmodel } from '../models/dropdownmodel';


@Injectable({
  providedIn: 'root'
})
export class ChallanmasterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedChallan = new Challanmastermodel();

  constructor(private httpClient: HttpClient) { }
  setChallanDetails(docrenewalmaster: Challanmastermodel) { 
      this.selectedChallan = docrenewalmaster;  
  }
  
  getChallanDetails() {
    return this.selectedChallan;
  }
  clearChallanDetails() {
    this.selectedChallan = new Challanmastermodel();
  }
  challanDetailsSubmitted(user: Challanmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/ChallanMasterSave', user, this.httpOptions);
  }
  getChallanList(filter: Reportmodel): Observable<Challanlistmodel> {
    return this.httpClient.post<Challanlistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetChallanMasterList', filter, this.httpOptions);
  }  
  getChallanInnerGridList(req: Requestmodel): Observable<Challanmastermodel> {
    return this.httpClient.post<Challanmastermodel>(Constants.API_ENDPOINT + 'FinTrans/GetChallanInnerGridList', req, this.httpOptions);
  }
  challanDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/ChallanMasterDelete', req, this.httpOptions);
  }

}
