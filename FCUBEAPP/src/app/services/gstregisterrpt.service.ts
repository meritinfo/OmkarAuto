import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Gstregisterrptlistmodel  } from 'src/app/models/gstregisterrptlistmodel';
import { Gstregisterrptmodel } from 'src/app/models/gstregisterrptmodel';

@Injectable({
  providedIn: 'root'
})
export class GstregisterrptService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getGstregisterrptList(filter: Reportmodel): Observable<Gstregisterrptlistmodel> {
    return this.httpClient.post<Gstregisterrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetGSTRegisterRptList', filter, this.httpOptions);
  }  
  getGstregisterrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetGSTRegisterRptExcel', filter, this.httpOptions);
  }    

}

