import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Lrcostingrptlistmodel  } from 'src/app/models/lrcostingrptlistmodel';
import { Lrcostingrptmodel } from 'src/app/models/lrcostingrptmodel';

@Injectable({
  providedIn: 'root'
})
export class LrcostingrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getLrcostingrptList(filter: Reportmodel): Observable<Lrcostingrptlistmodel> {
    return this.httpClient.post<Lrcostingrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLRCostingRptList', filter, this.httpOptions);
  }  
  getLrcostingrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLRCostingRptExcel', filter, this.httpOptions);
  }    

}
