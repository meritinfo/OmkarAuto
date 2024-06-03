import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Constants } from '../common/constants';
import { Challanlistmodel } from '../models/challanlistmodel';
import { Challanmastermodel } from '../models/challanmastermodel';
import { Panvalidapiresultmodel } from '../models/panvalidapiresultmodel';


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
  
  httpformOptions = {
    headers: new HttpHeaders({
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
  challanDetailsSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChallanMasterSave', user, this.httpformOptions);
  }
  getChallanList(filter: Reportmodel): Observable<Challanlistmodel> {
    return this.httpClient.post<Challanlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetChallanMasterList', filter, this.httpOptions);
  }  
  getChallanInnerGridList(req: Requestmodel): Observable<Challanmastermodel> {
    return this.httpClient.post<Challanmastermodel>(Constants.API_ENDPOINT + 'Consignment/GetChallanInnerGridList', req, this.httpOptions);
  }
  challanDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChallanMasterDelete', req, this.httpOptions);
  }  
  getChallanNo(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetChallanNo', req, this.httpOptions);
  }
  checkDuplicateChallan(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckDuplicateChallan', req, this.httpOptions);
  }
  getConsignmentId(req: Requestmodel): Observable<Challanmastermodel> {
    return this.httpClient.post<Challanmastermodel>(Constants.API_ENDPOINT + 'Consignment/GetConsignmentId', req, this.httpOptions);
  }
  getPanValidDetails(req: Requestmodel): Observable<Panvalidapiresultmodel> {
    return this.httpClient.post<Panvalidapiresultmodel>(Constants.API_ENDPOINT + 'Consignment/GetPanValidDetails', req, this.httpOptions);
  }
  getDetails(req: Requestmodel): Observable<Challanmastermodel> {
    return this.httpClient.post<Challanmastermodel>(Constants.API_ENDPOINT + 'Consignment/GetChallanDetailsFromLR', req, this.httpOptions);
  }
}
