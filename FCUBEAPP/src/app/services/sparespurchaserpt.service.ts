import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Sparespurchaserptlistmodel  } from 'src/app/models/sparespurchaserptlistmodel';
import { Sparespurchaserptmodel } from 'src/app/models/sparespurchaserptmodel';

@Injectable({
  providedIn: 'root'
})
export class SparespurchaserptService {

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getSparespurchaserptList(filter: Reportmodel): Observable<Sparespurchaserptlistmodel> {
    return this.httpClient.post<Sparespurchaserptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSparesPurchaseRptList', filter, this.httpOptions);
  }  
  getSparespurchaserptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSparesPurchaseRptExcel', filter, this.httpOptions);
  }    

}



