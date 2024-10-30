import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Onaccountmrstatusrptlistmodel  } from 'src/app/models/onaccountmrstatusrptlistmodel';
import { Onaccountmrstatusrptmodel } from 'src/app/models/onaccountmrstatusrptmodel';

@Injectable({
  providedIn: 'root'
})
export class OnaccountmrstatusrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getOnaccountmrstatusrptList(filter: Reportmodel): Observable<Onaccountmrstatusrptlistmodel> {
    return this.httpClient.post<Onaccountmrstatusrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOnAccountMRStatusRptList', filter, this.httpOptions);
  }  
  getOnaccountmrstatusrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOnAccountMRStatusRptExcel', filter, this.httpOptions);
  }    

}


