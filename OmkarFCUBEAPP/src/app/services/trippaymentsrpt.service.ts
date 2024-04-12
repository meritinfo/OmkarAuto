import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Trippaymentsrptlistmodel  } from 'src/app/models/trippaymentsrptlistmodel';
import { Trippaymentsrptmodel } from 'src/app/models/trippaymentsrptmodel';

@Injectable({
  providedIn: 'root'
})
export class TripPaymentsRptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  getTripPaymentsRptList(filter: Reportmodel): Observable<Trippaymentsrptlistmodel> {
    return this.httpClient.post<Trippaymentsrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripPaymentsRptList', filter, this.httpOptions);
  }  
  getTripPaymentsRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelTripPaymentsRptList', filter, this.httpOptions);
  }    

}
