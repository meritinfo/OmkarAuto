import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Exptruckarrivallistmodel  } from 'src/app/models/exptruckarrivallistmodel';
import { Exptruckarrivalmodel } from 'src/app/models/exptruckarrivalmodel';

@Injectable({
  providedIn: 'root'
})
export class ExptruckarrivalService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedExptruckarrival = new Exptruckarrivalmodel();
  constructor(private httpClient: HttpClient) { }
  
  setExptruckarrivalDetails(exptruckarrival: Exptruckarrivalmodel) { 
      this.selectedExptruckarrival = exptruckarrival;  
  }
  
  getExptruckarrivalDetails() {
    return this.selectedExptruckarrival;
  }
  clearCashReceiptEntryDetails() {
    this.selectedExptruckarrival = new Exptruckarrivalmodel();
  }
  getExptruckarrivalList(filter: Reportmodel): Observable<Exptruckarrivallistmodel> {
    return this.httpClient.post<Exptruckarrivallistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetExpTruckArrRPTList', filter, this.httpOptions);
  }  
  getExptruckarrivalExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelExpTruckArrRPTList', filter, this.httpOptions);
  }    

}
