import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Pagerequestwithdatesmodel } from '../models/pagerequestwithdatesmodel';
import { Responsemodel } from '../models/responsemodel';
import { Dieselstatementlistmodel } from '../models/dieselstatementlistmodel';
import { Dieselstatementsearchlistmodel } from '../models/dieselstatementsearchlistmodel';
import { Dieselstatementmodel } from '../models/dieselstatementmodel';
import { Driversalaryinnergridrequest } from '../models/driversalaryinnergridrequest';
import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class DieselstatementService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDieselStatement = new Dieselstatementmodel();

  constructor(private httpClient: HttpClient) { }
  setDieselStatementDetails(docrenewalmaster: Dieselstatementmodel) { 
    this.selectedDieselStatement = docrenewalmaster; 
  }

  clearDieselStatementDetails() {
    this.selectedDieselStatement= new Dieselstatementmodel();
  }

  getDieselStatementDetails() {
    return this.selectedDieselStatement;
  }

  getDieselStatementSearchList(request: Pagerequestwithdatesmodel): Observable<Dieselstatementmodel> {
    return this.httpClient.post<Dieselstatementmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStatementSearchList', request, this.httpOptions);
  }
  getDieselStatementList(filter: Pagerequestwithdatesmodel): Observable<Dieselstatementlistmodel> {
    return this.httpClient.post<Dieselstatementlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStatementList', filter, this.httpOptions);
  }

  saveDieselStatementDetails(request: Dieselstatementmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/SaveDieselStatementDetails', request, this.httpOptions);
  }

  dieselStatementDetailsDelete(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DieselStatementDetailsDelete', request, this.httpOptions);
  }
  getDieselStatementInnerGridList(request: Driversalaryinnergridrequest): Observable<Dieselstatementsearchlistmodel> {
    return this.httpClient.post<Dieselstatementsearchlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStatementInnerGridList', request, this.httpOptions);
  }
}
