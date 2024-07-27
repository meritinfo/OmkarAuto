import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from '../models/reportmodel';
import { Responsemodel } from '../models/responsemodel';
import { Dieselstmtlistmodel } from '../models/dieselstmtlistmodel';
import { Dieselstmtmodel } from '../models/dieselstmtmodel';
import { Requestmodel } from '../models/requestmodel';


@Injectable({
  providedIn: 'root'
})

export class DieselstmtService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedDieselStatement = new Dieselstmtmodel();

  constructor(private httpClient: HttpClient) { }
  setDieselStatementDetails(docrenewalmaster: Dieselstmtmodel) { 
    this.selectedDieselStatement = docrenewalmaster; 
  }

  clearDieselStatementDetails() {
    this.selectedDieselStatement= new Dieselstmtmodel();
  }

  getDieselStatementDetails() {
    return this.selectedDieselStatement;
  }

  getDieselStatementList(filter: Reportmodel): Observable<Dieselstmtlistmodel> {
    return this.httpClient.post<Dieselstmtlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStmtList', filter, this.httpOptions);
  }
  dieselStatementSave(request: Dieselstmtmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DieselStatementSave', request, this.httpOptions);
  }

  dieselStatementDelete(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DieselStatementDelete', request, this.httpOptions);
  }

  getDieselStatementInnerGridList(request: Requestmodel): Observable<Dieselstmtmodel> {
    return this.httpClient.post<Dieselstmtmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStmtInnerGridList', request, this.httpOptions);
  }
}
