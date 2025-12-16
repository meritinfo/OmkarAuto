import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from '../models/reportmodel';
import { Responsemodel } from '../models/responsemodel';
import { Dieselstatementlistmodel } from '../models/dieselstatementlistmodel';
import { Dieselstatementmodel } from '../models/dieselstatementmodel';
import { Requestmodel } from '../models/requestmodel';


@Injectable({
  providedIn: 'root'
})

export class DieselstmtbpclService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedDieselStatement = new Dieselstatementmodel();

  constructor(private httpClient: HttpClient) { }

  setDieselImportDetails(docrenewalmaster: Dieselstatementmodel) { 
    this.selectedDieselStatement = docrenewalmaster; 
  }

  clearDieselImportDetails() {
    this.selectedDieselStatement= new Dieselstatementmodel();
  }

  getDieselImportDetails() {
    return this.selectedDieselStatement;
  }

  getDieselApiDetails(filter: Reportmodel): Observable<Dieselstatementmodel> {
    return this.httpClient.post<Dieselstatementmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselApiDetails', filter, this.httpOptions);
  }
  
  dieselImportSave(request: Dieselstatementmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DieselImportSave', request, this.httpOptions);
  }
  dieselImportDelete(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DieselStatementDetailsDelete', request, this.httpOptions);
  }

  getDieselImportInnerGridList(request: Requestmodel): Observable<Dieselstatementmodel> {
    return this.httpClient.post<Dieselstatementmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselImportInnerGridList', request, this.httpOptions);
  }
}
