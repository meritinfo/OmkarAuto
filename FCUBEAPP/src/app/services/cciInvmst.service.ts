import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Ccinvmstmodel } from '../models/cciInvmstmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Reportmodel } from '../models/reportmodel';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { CciInvmstlistmodel } from '../models/cciInvmstlistmodel';
import { Consignmentmodel } from '../models/consignmentmodel';

@Injectable({
  providedIn: 'root'
})
export class CciInvoiceMstService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedCciInvoiceMaster = new Ccinvmstmodel();
  constructor(private httpClient: HttpClient) { }


  setVehiclerepmaintDetails(tyremaster:Ccinvmstmodel) {
      this.selectedCciInvoiceMaster = tyremaster;      
  }

  getCciinvoiceMasterDetails() {
    return this.selectedCciInvoiceMaster;
  }
  clearCCiInvMasterDetails() {
    this.selectedCciInvoiceMaster = new Ccinvmstmodel();
  }
  cciInvoiceMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CciInvoiceMstDelete', req, this.httpOptions);
  }
  chkSparesNoDuplicate(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ChkTyreNoDuplicate', req, this.httpOptions);
  }
  getCciInvoiceMasterInnerGridList(request: Requestmodel): Observable<Ccinvmstmodel> {
    return this.httpClient.post<Ccinvmstmodel>(Constants.API_ENDPOINT + 'Consignment/GetCciInvoiceDtlInnerGridList', request, this.httpOptions);
  }
  getCnDetail(request: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetCnDetail', request, this.httpOptions);
  }
  getChCostDetail(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetChCostDetail', request, this.httpOptions);
  }
  cciInvoiceMasterSubmitted(user: Ccinvmstmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CciInvoiceMstSave', user, this.httpOptions);
  }
  getCciInvoiceMasterList(filter: Reportmodel): Observable<CciInvmstlistmodel> {
    return this.httpClient.post<CciInvmstlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetCciInvoiceMstMasterList', filter, this.httpOptions);
  }  
  getChCostList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetChCostList', null, this.httpOptions);
  }
  
  getLrDetails(user: Requestmodel):Observable<Consignmentmodel> {
    return this.httpClient.post<Consignmentmodel>(Constants.API_ENDPOINT + 'Consignment/GetLRDetails', user, this.httpOptions);
  }
}
