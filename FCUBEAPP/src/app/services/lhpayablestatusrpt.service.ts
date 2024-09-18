import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Lhpayablestatusrptlistmodel  } from 'src/app/models/lhpayablestatusrptlistmodel';
import { Lhpayablestatusrptmodel } from 'src/app/models/lhpayablestatusrptmodel';

@Injectable({
  providedIn: 'root'
})
export class LhpayablestatusrptService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getLhpayablestatusrptList(filter: Reportmodel): Observable<Lhpayablestatusrptlistmodel> {
    return this.httpClient.post<Lhpayablestatusrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLhPayableStatusRptList', filter, this.httpOptions);
  }  
  getLhpayablestatusrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLhPayableStatusRptExcel', filter, this.httpOptions);
  }    

}

