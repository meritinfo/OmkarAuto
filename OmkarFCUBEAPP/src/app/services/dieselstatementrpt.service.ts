import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dieselstatementrptlistmodel  } from 'src/app/models/dieselstatementrptlistmodel';
import { Dieselstatementrptmodel } from 'src/app/models/dieselstatementrptmodel';

@Injectable({
  providedIn: 'root'
})
export class DieselStatementRptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDieselStatementRpt = new Dieselstatementrptmodel();
  constructor(private httpClient: HttpClient) { }
  
  setDieselStatementDetails(exptruckarrival: Dieselstatementrptmodel) { 
      this.selectedDieselStatementRpt = exptruckarrival;  
  }
  
  getDieselStatementRptDetails() {
    return this.selectedDieselStatementRpt;
  }
//  clearCashReceiptEntryDetails() {
   // this.selectedExptruckarrival = new Exptruckarrivalmodel();
 // }
 getDieselStatementRptList(filter: Reportmodel): Observable<Dieselstatementrptlistmodel> {
    return this.httpClient.post<Dieselstatementrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStatementRptList', filter, this.httpOptions);
  }  
  getDieselStatementRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
   return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelDieselStatementRptList', filter, this.httpOptions);
  }    

}
