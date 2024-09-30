import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Lhpmvariancerptlistmodel  } from 'src/app/models/lhpmvariancerptlistmodel';
import { Lhpmvariancerptmodel } from 'src/app/models/lhpmvariancerptmodel';

@Injectable({
  providedIn: 'root'
})
export class LhpmvariancerptService {
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getLhpmvariancerptList(filter: Reportmodel): Observable<Lhpmvariancerptlistmodel> {
    return this.httpClient.post<Lhpmvariancerptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLHPMVarianceRptList', filter, this.httpOptions);
  }  
  getLhpmvariancerptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLHPMVarianceRptExcel', filter, this.httpOptions);
  }    

}


