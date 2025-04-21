import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Ratesmasternewmodel } from '../models/ratesmasternewmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import {Branchcustomertargetmodel } from '../models/branchcustomertargetmstmodel';
import {Branchcustomertargetmstlistmodel } from '../models/branchcustomermstlist';

@Injectable({
  providedIn: 'root'
})
export class BranchCustomerTargetService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedbranchmastertargetnew = new Branchcustomertargetmodel();
  constructor(private httpClient: HttpClient) { }
  setbranchMasterTargetDetails(spareslubesmaster:Branchcustomertargetmodel) {
 
      this.selectedbranchmastertargetnew = spareslubesmaster;
    
  
  }
  getBranchCustomerDetails() {
    return this.selectedbranchmastertargetnew;
  }
  branchCustomerTargetDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BranchCustomerTargetDelete', req, this.httpOptions);
  }
  
  checkDuplicateSpare(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/checkDuplicateSpares', req, this.httpOptions);
  }
  getBranchCustomertargetInnerGridList(request: Requestmodel): Observable<Ratesmasternewmodel> {
    return this.httpClient.post<Ratesmasternewmodel>(Constants.API_ENDPOINT + 'FreightMasters/BranchCustomerTargetDtlInnerGridList', request, this.httpOptions);
  }
  clearBranchCustomerTargetDetails() {
    this.selectedbranchmastertargetnew = new Branchcustomertargetmodel();
  }
  getBrandList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetBrandList', null, this.httpOptions);
  }
  
 branchCustomerTargetSubmitted(user:Branchcustomertargetmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BranchCustomerTargetSave', user, this.httpOptions);
  }
  getBranchCustomerTargetList(filter: Filtermodel): Observable<Branchcustomertargetmstlistmodel> {
    return this.httpClient.post<Branchcustomertargetmstlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBranchCustomerTargetMstList', filter, this.httpOptions);
  }
}
