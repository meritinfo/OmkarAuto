import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Distancemastertriprptlistmodel  } from 'src/app/models/distancemastertriprptlistmodel';
import { Distancemastertriprptmodel } from 'src/app/models/distancemastertriprptmodel';

@Injectable({
  providedIn: 'root'
})
export class DistanceMasterTripRptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDistanceMasterTripRpt = new Distancemastertriprptmodel();
  constructor(private httpClient: HttpClient) { }
  
  setDistanceMasterDetails(exptruckarrival: Distancemastertriprptmodel) { 
      this.selectedDistanceMasterTripRpt = exptruckarrival;  
  }
  
  getDistanceMastertripRptDetails() {
    return this.selectedDistanceMasterTripRpt;
  }
//  clearCashReceiptEntryDetails() {
   // this.selectedExptruckarrival = new Exptruckarrivalmodel();
 // }
 getDistancemMsterTripRptList(filter: Reportmodel): Observable<Distancemastertriprptlistmodel> {
    return this.httpClient.post<Distancemastertriprptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDistancemasterTripRptList', filter, this.httpOptions);
  }  
  getDistanceMasterTripRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ExcelDistanceMasterTripRptList', filter, this.httpOptions);
  }    

}
