import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Driverlicrptlistmodel  } from 'src/app/models/driverlicrptlistmodel';
import { Driverlicrptmodel } from 'src/app/models/driverlicrptmodel';

@Injectable({
  providedIn: 'root'
})
export class DriverLicRptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  getDriverLicRptList(filter: Reportmodel): Observable<Driverlicrptlistmodel> {
    return this.httpClient.post<Driverlicrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDriverLicRPTList', filter, this.httpOptions);
  }  
  getDriverLicRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ExcelDriverLicRptList', filter, this.httpOptions);
  }    

}
