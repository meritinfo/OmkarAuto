import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Unbilledprovisionmstmodel } from '../models/unbillprovisionmst';
import { Responsemodel } from '../models/responsemodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import {UnbillprovisionmstList } from '../models/unbillprovisionmstlist';



@Injectable({
  providedIn: 'root'
})
export class UnbilledProvisionMstService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedunbillprovisionmst = new Unbilledprovisionmstmodel();
  constructor(private httpClient: HttpClient) { }
  unBillProvisionDetails(spareslubesmaster:Unbilledprovisionmstmodel) {
 
      this.selectedunbillprovisionmst = spareslubesmaster;
    
  
  }
  getunBillProvisionDetails() {
    return this.selectedunbillprovisionmst;
  }
  unbillprovisionDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/UnBillProvisionMstDelete', req, this.httpOptions);
  }
   getprovisionSearchList(request: Reportmodel): Observable<Unbilledprovisionmstmodel> {
    return this.httpClient.post<Unbilledprovisionmstmodel>(Constants.API_ENDPOINT + 'Consignment/GetUnBillProvisonSearchList', request, this.httpOptions);
  }
  
  checkDuplicateSpare(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/checkDuplicateSpares', req, this.httpOptions);
  }
  getRatesMasterNewInnerGridList(request: Requestmodel): Observable<Unbilledprovisionmstmodel> {
    return this.httpClient.post<Unbilledprovisionmstmodel>(Constants.API_ENDPOINT + 'Consignment/GetUnBillProvisionMstGridList', request, this.httpOptions);
  }
  clearUnBillProvisionDetails() {
    this.selectedunbillprovisionmst = new Unbilledprovisionmstmodel();
  }
  getBrandList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetBrandList', null, this.httpOptions);
  }
  
 unbillprovisionSubmitted(user:Unbilledprovisionmstmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/UnBillProvisionMstSave', user, this.httpOptions);
  }
  getUnbillProvisionMstList(filter: Filtermodel): Observable<UnbillprovisionmstList> {
    return this.httpClient.post<UnbillprovisionmstList>(Constants.API_ENDPOINT + 'Consignment/GetUnBillProvisionMstList', filter, this.httpOptions);
  }
}
