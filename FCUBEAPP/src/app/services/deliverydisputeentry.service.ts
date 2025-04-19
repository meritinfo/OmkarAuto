import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Deliverydisputeentrymodel } from '../models/deliverydisputeentrymodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from '../common/constants';
import { Deliverydisputeentrylistmodel } from '../models/deliverydisputeentrylistmodel';

@Injectable({
  providedIn: 'root'
})
export class DeliveryDisputeEntryService {

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
  selectedDeliverydisputeentry = new Deliverydisputeentrymodel();
  constructor(private httpClient: HttpClient) { }
  setDeliverydisputeentryDetails(Branch: Deliverydisputeentrymodel) {
 
      this.selectedDeliverydisputeentry = Branch;
    
  
  }
  getSelectedDeliverydisputeentryDetails() {
    return this.selectedDeliverydisputeentry;
  }
  clearSelectedDeliverydisputeentryDetails() {
    this.selectedDeliverydisputeentry = new Deliverydisputeentrymodel();
  }
 
  SelectedDeliverydisputeentrySubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DeliveryDisputeEntrySave', user, this.httpformOptions);
  }
  getDispSlNo(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetDispSlNo', request, this.httpOptions);
  }  
  
  getSelectedDeliverydisputeentryList(filter: Filtermodel): Observable<Deliverydisputeentrylistmodel> {
    return this.httpClient.post<Deliverydisputeentrylistmodel>(Constants.API_ENDPOINT + 'Consignment/GetDeliveryDisputeEntryList', filter, this.httpOptions);
  }
  checkDuplicateLrForDispute(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckDuplicateLRForDispute', req, this.httpOptions);
  }
   getConsignmentDetails(request: Requestmodel):Observable<Deliverydisputeentrymodel> {
      return this.httpClient.post<Deliverydisputeentrymodel>(Constants.API_ENDPOINT + 'Consignment/GetDeliveryCnDetails', request, this.httpOptions);
    }

  DeliverydisputeentryDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DeliveryDisputeEntryDelete', req, this.httpOptions);
  }

  chkCodeExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkCodeExits', request, this.httpOptions);
  }
  checkDuplicateBillType(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateBillType', req, this.httpOptions);
  }
  chkBranchNameExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkBranchNameExits', request, this.httpOptions);
  }
}
