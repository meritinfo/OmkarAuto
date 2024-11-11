import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Businesssummrptlistmodel  } from 'src/app/models/businesssummrptlistmodel';
import { Businesssummrptmodel } from 'src/app/models/businesssummrptmodel';

@Injectable({
  providedIn: 'root'
})
export class BusinesssummrptService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getBusinesssummrptList(filter: Reportmodel): Observable<Businesssummrptlistmodel> {
    return this.httpClient.post<Businesssummrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBusinessSummRptList', filter, this.httpOptions);
  }  
  getBusinesssummrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBusinessSummRptExcel', filter, this.httpOptions);
  }    

}

