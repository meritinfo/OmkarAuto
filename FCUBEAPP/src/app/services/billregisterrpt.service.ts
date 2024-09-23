import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Billregisterrptlistmodel  } from 'src/app/models/billregisterrptlistmodel';
import { Billregisterrptmodel } from 'src/app/models/billregisterrptmodel';

@Injectable({
  providedIn: 'root'
})
export class BillregisterrptService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getBillregisterrptList(filter: Reportmodel): Observable<Billregisterrptlistmodel> {
    return this.httpClient.post<Billregisterrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillRegisterRptList', filter, this.httpOptions);
  }  
  getBillregisterrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillRegisterRptExcel', filter, this.httpOptions);
  }    

}

