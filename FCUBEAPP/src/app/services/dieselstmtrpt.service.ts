import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dieselstmtrptlistmodel  } from 'src/app/models/dieselstmtrptlistmodel';
import { Dieselstmtrptmodel } from 'src/app/models/dieselstmtrptmodel';

@Injectable({
  providedIn: 'root'
})
export class DieselstmtrptService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getDieselstmtrptList(filter: Reportmodel): Observable<Dieselstmtrptlistmodel> {
    return this.httpClient.post<Dieselstmtrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStmtRptList', filter, this.httpOptions);
  }  
  getDieselstmtrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStmtRptExcel', filter, this.httpOptions);
  }    

}


