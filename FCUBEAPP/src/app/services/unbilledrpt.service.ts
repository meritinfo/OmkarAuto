import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Unbilledrptlistmodel  } from 'src/app/models/unbilledrptlistmodel';
import { Dprrptlistmodel } from 'src/app/models/dprrptlistmodel';

@Injectable({
  providedIn: 'root'
})
export class UnbilledrptService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getUnbilledrptList(filter: Reportmodel): Observable<Unbilledrptlistmodel> {
    return this.httpClient.post<Unbilledrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetUnBilledRptList', filter, this.httpOptions);
  }  
  getUnbilledrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetUnBilledRptExcel', filter, this.httpOptions);
  }    

  getPendingDelvAckRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetPendingDelvAckRptExcel', filter, this.httpOptions);
  }
  
  
  getDPRRptList(filter: Reportmodel): Observable<Dprrptlistmodel> {
    return this.httpClient.post<Dprrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDPRRptList', filter, this.httpOptions);
  }  
  getDPRRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDPRRptExcel', filter, this.httpOptions);
  }   
}

