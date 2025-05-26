import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Constants } from '../common/constants';
import { ChallanlistmodelllP } from '../models/challanmasterlistllp';
import { ChallanmastermodelllP } from '../models/challanmastermodelllp';
import { Panvalidapiresultmodel } from '../models/panvalidapiresultmodel';
import { Ccinvdetailmodel } from '../models/cciinvdetailmodel';


@Injectable({
  providedIn: 'root'
})
export class ChallanmasterServiceLLP {
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
  selectedChallan = new ChallanmastermodelllP();

  constructor(private httpClient: HttpClient) { }
  setChallanDetails(docrenewalmaster: ChallanmastermodelllP) { 
      this.selectedChallan = docrenewalmaster;  
  }
  
  getChallanDetails() {
    return this.selectedChallan;
  }
  clearChallanDetails() {
    this.selectedChallan = new ChallanmastermodelllP();
  }
  challanDetailsSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChallanMasterSaveLLP', user, this.httpformOptions);
  }
  getChallanList(filter: Reportmodel): Observable<ChallanlistmodelllP> {
    return this.httpClient.post<ChallanlistmodelllP>(Constants.API_ENDPOINT + 'Consignment/GetChallanMasterListLLP', filter, this.httpOptions);
  }  
  getChallanInnerGridList(req: Requestmodel): Observable<ChallanmastermodelllP> {
    return this.httpClient.post<ChallanmastermodelllP>(Constants.API_ENDPOINT + 'Consignment/GetChallanInnerGridListLLP', req, this.httpOptions);
  }
  challanDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChallanMasterDeleteLLP', req, this.httpOptions);
  }  
  getChallanNo(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetChallanNo', req, this.httpOptions);
  }
  checkDuplicateChallan(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckDuplicateChallan', req, this.httpOptions);
  }
  getConsignmentId(req: Requestmodel): Observable<ChallanmastermodelllP> {
    return this.httpClient.post<ChallanmastermodelllP>(Constants.API_ENDPOINT + 'Consignment/GetConsignmentId', req, this.httpOptions);
  }
  getGetCCIInviceDetail(req: Requestmodel): Observable<Ccinvdetailmodel> {
    return this.httpClient.post<Ccinvdetailmodel>(Constants.API_ENDPOINT + 'Consignment/GetCCIInviceDetailLLP', req, this.httpOptions);
  }
  getPanValidDetails(req: Requestmodel): Observable<Panvalidapiresultmodel> {
    return this.httpClient.post<Panvalidapiresultmodel>(Constants.API_ENDPOINT + 'Consignment/GetPanValidDetails', req, this.httpOptions);
  }
  getDetails(req: Requestmodel): Observable<ChallanmastermodelllP> {
    return this.httpClient.post<ChallanmastermodelllP>(Constants.API_ENDPOINT + 'Consignment/GetChallanDetailsFromLR', req, this.httpOptions);
  }
  checkChallanPrepForLr(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckChallanPrepForLr', req, this.httpOptions);
  }
  getChallanPrintPdf(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetChallanPrintPdfLLP', req, this.httpOptions);
  }
  getPanwiseTdsRate(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetPanwiseTdsRate', req, this.httpOptions);
  }
  chkPanDeclaration(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChkPanDeclaration', req, this.httpOptions);
  }
  getLhPanTdsRate(req: Requestmodel): Observable<Reportmodel> {
    return this.httpClient.post<Reportmodel>(Constants.API_ENDPOINT + 'Consignment/GetLhPanTdsRate', req, this.httpOptions);
  }
  getBranchPanApiUse(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetBranchPanApiUse', req, this.httpOptions);
  }
  
}
