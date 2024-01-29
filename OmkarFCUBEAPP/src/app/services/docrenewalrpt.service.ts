import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Docrenewalrptlistmodel  } from 'src/app/models/docrenewalrptlistmodel';
import { Docrenewalrptmodel } from 'src/app/models/docrenewalrptmodel';

@Injectable({
  providedIn: 'root'
})
export class DocRenewalRptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDocRenewalRpt = new Docrenewalrptmodel();
  constructor(private httpClient: HttpClient) { }
  
  setDocRenewalMasterDetails(exptruckarrival: Docrenewalrptmodel) { 
      this.selectedDocRenewalRpt = exptruckarrival;  
  }
  
  getDocRenewalRptDetails() {
    return this.selectedDocRenewalRpt;
  }
//  clearCashReceiptEntryDetails() {
   // this.selectedExptruckarrival = new Exptruckarrivalmodel();
 // }
//  getExptruckarrivalList(filter: Reportmodel): Observable<Exptruckarrivallistmodel> {
 //   return this.httpClient.post<Exptruckarrivallistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetExpTruckArrRPTList', filter, this.httpOptions);
//  }  
  getExptruckarrivalExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelExpTruckArrRPTList', filter, this.httpOptions);
  }    

}
