import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from '../models/reportmodel';
import { Responsemodel } from '../models/responsemodel';
import { Vendorpmtlistmodel } from '../models/vendorpmtlistmodel';
import { Vendorpmtmodel } from '../models/vendorpmtmodel';
import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class VendorpmtService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedVendorpmt = new Vendorpmtmodel();

  constructor(private httpClient: HttpClient) { }

  setVendorPmtDetails(docrenewalmaster: Vendorpmtmodel) { 
    this.selectedVendorpmt = docrenewalmaster; 
  }

  clearVendorPmtDetails() {
    this.selectedVendorpmt= new Vendorpmtmodel();
  }

  getVendorPmtDetails() {
    return this.selectedVendorpmt;
  }

  getVendorPmtSearchList(request: Reportmodel): Observable<Vendorpmtmodel> {
    return this.httpClient.post<Vendorpmtmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVendorPmtSearchList', request, this.httpOptions);
  }
  getVendorPmtList(filter: Reportmodel): Observable<Vendorpmtlistmodel> {
    return this.httpClient.post<Vendorpmtlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVendorPmtList', filter, this.httpOptions);
  }
  vendorPmtDetailsSave(request: Vendorpmtmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VendorPmtDetailsSave', request, this.httpOptions);
  }
  vendorPmtDetailsDelete(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VendorPmtDetailsDelete', request, this.httpOptions);
  }
  getVendorPmtInnerGridList(request: Requestmodel): Observable<Vendorpmtmodel> {
    return this.httpClient.post<Vendorpmtmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVendorPmtInnerGridList', request, this.httpOptions);
  }
   getVendorPmtRptList(filter: Reportmodel): Observable<Vendorpmtlistmodel> {
    return this.httpClient.post<Vendorpmtlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVendorPmtRptList', filter, this.httpOptions);
  }
   getVendorPmtRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVendorPmtRptExcel', filter, this.httpOptions);
  }
}
