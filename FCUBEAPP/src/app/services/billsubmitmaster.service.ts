import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Billsubmitmastermodel } from '../models/billsubmitmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Billsubmitsearchlistmodel } from 'src/app/models/billsubmitsearchlistmodel';
import { Billsubmitmasterlistmodel } from '../models/billsubmitmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class BillSubmitMasterService {

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


  selectedBillSubmitMaster = new Billsubmitmastermodel();
  constructor(private httpClient: HttpClient) { }


  setBillSubmitMasterDetails(tyremaster:Billsubmitmastermodel) {
      this.selectedBillSubmitMaster = tyremaster;      
  }

  getBillSubmitMasterDetails() {
    return this.selectedBillSubmitMaster;
  }
  clearBillSubmitMasterDetails() {
    this.selectedBillSubmitMaster = new Billsubmitmastermodel();
  }
  billSubmitMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BillSubmitMasterDelete', req, this.httpOptions);
  }
  getBillsSubmitSearchList(request: Requestmodel): Observable<Billsubmitsearchlistmodel> {
    return this.httpClient.post<Billsubmitsearchlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillSubmitSearchList', request, this.httpOptions);
  }  
//   chkSparesNoDuplicate(req: Requestmodel): Observable<Responsemodel> {
//     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ChkTyreNoDuplicate', req, this.httpOptions);
//   }
  getBillSubmitMasterInnerGridList(request: Requestmodel): Observable<Billsubmitmastermodel> {
    return this.httpClient.post<Billsubmitmastermodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillSubmitMasterInnerGridList', request, this.httpOptions);
  }
  billsubmitMasterSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BillSubmitMstSave', user, this.httpformOptions);
  }
  getBillSubmitMasterList(filter: Filtermodel): Observable<Billsubmitmasterlistmodel> {
    return this.httpClient.post<Billsubmitmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillSubmitMasterList', filter, this.httpOptions);
  }  
}
