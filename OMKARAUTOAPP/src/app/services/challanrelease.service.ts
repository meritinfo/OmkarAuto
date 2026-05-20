import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Constants } from '../common/constants';
import { Filtermodel } from '../models/filtermodel';
import { Challanreleaselistmodel } from '../models/challanreleaselistmodel';
import { ChallanreleaseModel } from '../models/challanreleasemodel';
import { Challanmastermodel } from 'src/app/models/challanmastermodel';
import { Panvalidapiresultmodel } from '../models/panvalidapiresultmodel';


@Injectable({
  providedIn: 'root'
})
export class ChallanReleaseService {
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
  selectedChallanRel = new ChallanreleaseModel();

  constructor(private httpClient: HttpClient) { }
  setChallanDetails(docrenewalmaster: ChallanreleaseModel) { 
      this.selectedChallanRel = docrenewalmaster;  
  }
  
  getChallanDetails() {
    return this.selectedChallanRel;
  }
  clearChallanReleaseDetails() {
    this.selectedChallanRel = new ChallanreleaseModel();
  }
  challanReleaseDetailsSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChallanReleaseSave', user, this.httpformOptions);
  }
  
  getChallanReleaseInnerGridList(req: Requestmodel): Observable<ChallanreleaseModel> {
    return this.httpClient.post<ChallanreleaseModel>(Constants.API_ENDPOINT + 'Consignment/GetChallanInnerGridList', req, this.httpOptions);
  }
  challanReleaseDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChallanReleaseDelete', req, this.httpOptions);
  }  
  searchChallanDetail(req: Reportmodel): Observable<Challanmastermodel> {
    return this.httpClient.post<Challanmastermodel>(Constants.API_ENDPOINT + 'Consignment/SearchChallanDetails', req, this.httpOptions);
  }
  checkDuplicateChallanRelease(req: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckDuplicateChallanrelease', req, this.httpOptions);
  }
//   getConsignmentId(req: Requestmodel): Observable<Challanmastermodel> {
//     return this.httpClient.post<Challanmastermodel>(Constants.API_ENDPOINT + 'Consignment/GetConsignmentId', req, this.httpOptions);
//   }
  getPanValidDetails(req: Requestmodel): Observable<Panvalidapiresultmodel> {
    return this.httpClient.post<Panvalidapiresultmodel>(Constants.API_ENDPOINT + 'Consignment/GetPanValidDetails', req, this.httpOptions);
  }
//   getDetails(req: Requestmodel): Observable<Challanreleasemodel> {
//     return this.httpClient.post<Challanreleasemodel>(Constants.API_ENDPOINT + 'Consignment/GetChallanDetailsFromLR', req, this.httpOptions);
//   }
  checkChallanPrepForLr(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckChallanPrepForLr', req, this.httpOptions);
  }
  getChallanEnqDetails(filter: Requestmodel): Observable<ChallanreleaseModel> {
    return this.httpClient.post<ChallanreleaseModel>(Constants.API_ENDPOINT + 'Consignment/GetChallanEnqDetails', filter, this.httpOptions);
  }
  getChallanEnqInnerGridList(req: Requestmodel): Observable<ChallanreleaseModel> {
    return this.httpClient.post<ChallanreleaseModel>(Constants.API_ENDPOINT + 'Consignment/GetChallanEnqInnerGridList', req, this.httpOptions);
  }
  
 challanReleaseSubmitted(user:ChallanreleaseModel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChallanReleaseSave', user, this.httpOptions);
  }
  getChallanReleaseList(filter: Filtermodel): Observable<Challanreleaselistmodel> {
    return this.httpClient.post<Challanreleaselistmodel>(Constants.API_ENDPOINT + 'Consignment/GetChallanReleaseList', filter, this.httpOptions);
  }
}
