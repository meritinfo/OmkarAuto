import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Consignmentmodel } from '../models/consignmentmodel';
import { Consignmentupdatemodel } from '../models/consignmentupdatemodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Cnenqdocmodel } from '../models/cnenqdocmodel';
import { Constants } from '../common/constants';
import { Consignmentlistmodel } from '../models/consignmentlistmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Requestmodel } from '../models/requestmodel';
import { Consignmentgstmodel } from '../models/consignmentgstmodel';

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
  getLrNoLLP(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetLrNoLLP', req, this.httpOptions);
  }
  checkDuplicateLr(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckDuplicateLr', req, this.httpOptions);
  }
  checkDuplicateLrLLP(req: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckDuplicateLrLLP', req, this.httpOptions);
  }
  genLrNo(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GenerateLrNo', req, this.httpOptions);
  }
  checkVehicleNo(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckVehicleNo', req, this.httpOptions);
  }
    checkTruckNo(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckTruckNo', req, this.httpOptions);
  }


  getTruckMasterMandatoryYN(): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetTruckMasterMandatoryYN', null, this.httpOptions);
  } 
  getLrInnerGridList(req: Requestmodel): Observable<Consignmentmodel> {
    return this.httpClient.post<Consignmentmodel>(Constants.API_ENDPOINT + 'Consignment/GetLrInnerGridList', req, this.httpOptions);
  }
  getConsignmentDetailsForUpdate(request: Requestmodel):Observable<Consignmentmodel> {
    return this.httpClient.post<Consignmentmodel>(Constants.API_ENDPOINT + 'Consignment/GetConsignmentUpdateDetails', request, this.httpOptions);
  }
  
  updateConsignmentDetails(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ConsignmentUpdate', user, this.httpformOptions);
  }

  consignmentLocalFrtUpdate(user: Consignmentupdatemodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ConsignmentLocalFrtUpdate', user, this.httpOptions);
  }

  getCnEnqDetails(filter: Requestmodel): Observable<Consignmentmodel> {
    return this.httpClient.post<Consignmentmodel>(Constants.API_ENDPOINT + 'Consignment/GetCnEnqDetails', filter, this.httpOptions);
  }
  getCnEnqDoc(filter: Requestmodel): Observable<Cnenqdocmodel> {
    return this.httpClient.post<Cnenqdocmodel>(Constants.API_ENDPOINT + 'Consignment/GetCnEnqDoc', filter, this.httpOptions);
  }
  getCnEnqInnerGridList(req: Requestmodel): Observable<Consignmentmodel> {
    return this.httpClient.post<Consignmentmodel>(Constants.API_ENDPOINT + 'Consignment/GetCnEnqInnerGridList', req, this.httpOptions);
  }
  getLrPrint(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetLRPrint', filter, this.httpOptions);
  }  
  getFreightGstDetails(req: Requestmodel): Observable<Consignmentgstmodel> {
    return this.httpClient.post<Consignmentgstmodel>(Constants.API_ENDPOINT + 'Consignment/GetFreightGstDetails', req, this.httpOptions);
  }
  
}
