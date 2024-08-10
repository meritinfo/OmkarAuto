import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Lrwithoutchallanrptlistmodel  } from 'src/app/models/lrwithoutchallanrptlistmodel';
import { Lrwithoutchallanrptmodel } from 'src/app/models/lrwithoutchallanrptmodel';

@Injectable({
  providedIn: 'root'
})
export class LrwithoutchallanrptService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getLrwithoutchallanrptList(filter: Reportmodel): Observable<Lrwithoutchallanrptlistmodel> {
    return this.httpClient.post<Lrwithoutchallanrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLRWithOutChallanRptList', filter, this.httpOptions);
  }  
  getLrwithoutchallanrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLRWithOutChallanRptExcel', filter, this.httpOptions);
  }    

}
