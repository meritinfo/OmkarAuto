import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Ccinvmstmodel } from '../models/cciInvmstmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { CciInvmstlistmodel } from '../models/cciInvmstlistmodel';

@Injectable({
  providedIn: 'root'
})
export class CciInvoiceMstService {

  httpOptions = {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  httpformOptions = {
    headers: new HttpHeaders({
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
  cciInvoiceMasterSubmitted(user: Ccinvmstmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CciInvoiceMstSave', user, this.httpformOptions);
  }
  getCciInvoiceMasterList(filter: Filtermodel): Observable<CciInvmstlistmodel> {
    return this.httpClient.post<CciInvmstlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetCciinvoiceMasterList', filter, this.httpOptions);
  }  
  getSpareStockAvailable(user: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSpareStockAvailable', user, this.httpformOptions);
  }
}
