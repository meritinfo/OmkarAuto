import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Distancemasterfrtrptlistmodel  } from 'src/app/models/distancemasterfrtrptlistmodel';
import { Distancemasterfrtrptmodel } from 'src/app/models/distancemasterfrtrptmodel';

@Injectable({
  providedIn: 'root'
})
export class DistanceMasterFrtRptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDistanceMasterFrtRpt = new Distancemasterfrtrptmodel();
  constructor(private httpClient: HttpClient) { }
  
  setDistanceMasterDetails(exptruckarrival: Distancemasterfrtrptmodel) { 
      this.selectedDistanceMasterFrtRpt = exptruckarrival;  
  }
  
  getDistanceMasterFrtRptDetails() {
    return this.selectedDistanceMasterFrtRpt;
  }
//  clearCashReceiptEntryDetails() {
   // this.selectedExptruckarrival = new Exptruckarrivalmodel();
 // }
 getDistancemMsterFrtRptList(filter: Reportmodel): Observable<Distancemasterfrtrptlistmodel> {
    return this.httpClient.post<Distancemasterfrtrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDistancemasterFrtRptList', filter, this.httpOptions);
  }  
  getDistanceMasterFrtRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ExcelDistanceMasterFrtRptList', filter, this.httpOptions);
  }    

}
