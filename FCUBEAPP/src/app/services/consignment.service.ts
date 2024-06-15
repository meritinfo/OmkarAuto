import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Consignmentmodel } from '../models/consignmentmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Consignmentlistmodel } from '../models/consignmentlistmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})

export class ConsignmentService {

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
  
  selectedConsignment = new Consignmentmodel();
  constructor(private httpClient: HttpClient) { }

  setConsignmentDetails(consignment: Consignmentmodel) { 
      this.selectedConsignment = consignment;  
  }
  getConsignmentDetails() {
    return this.selectedConsignment;
  }
  clearConsignmentDetails() {
    this.selectedConsignment = new Consignmentmodel();
  }
  consignmentDetailsSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ConsignmentSave', user, this.httpformOptions);
  }
  consignmentUpdateSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ConsignmentUpdate', user, this.httpformOptions);
  }
  consignmentTripDetailsSubmitted(user: Consignmentmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ConsignmentTripSave', user, this.httpOptions);
  }
  consignmentDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ConsignmentDelete', req, this.httpOptions);
  }
  getConsignmentList(filter: Reportmodel): Observable<Consignmentlistmodel> {
    return this.httpClient.post<Consignmentlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetConsignmentList', filter, this.httpOptions);
  }
  getLrNo(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetLrNo', req, this.httpOptions);
  }
  checkDuplicateLr(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckDuplicateLr', req, this.httpOptions);
  }
  checkVehicleNo(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckVehicleNo', req, this.httpOptions);
  }
  getLrInnerGridList(req: Requestmodel): Observable<Consignmentmodel> {
    return this.httpClient.post<Consignmentmodel>(Constants.API_ENDPOINT + 'Consignment/GetLrInnerGridList', req, this.httpOptions);
  }
  getConsignmentDetailsForUpdate(request: Requestmodel):Observable<Consignmentmodel> {
    return this.httpClient.post<Consignmentmodel>(Constants.API_ENDPOINT + 'Consignment/GetConsignmentUpdateDetails', request, this.httpOptions);
  }
  
  updateConsignmentDetails(user: Consignmentmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ConsignmentUpdate', user, this.httpOptions);
  }
}
