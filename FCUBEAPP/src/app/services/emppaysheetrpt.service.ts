
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Emppaygenlist  } from 'src/app/models/emppaygenlist';


@Injectable({
  providedIn: 'root'
})
export class EmppaysheetrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getPaySheetRptList(filter: Reportmodel): Observable<Emppaygenlist> {
    return this.httpClient.post<Emppaygenlist>(Constants.API_ENDPOINT + 'HRMaster/GetPaySheetRptList', filter, this.httpOptions);
  }  
  getPaySheetRptExcel(filter: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/GetPaySheetRptExcel', filter, this.httpOptions);
  } 
  getPfECRExcel(filter: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/GetPfECRExcel', filter, this.httpOptions);
  }   
  getPfECRText(filter: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/GetPfECRText', filter, this.httpOptions);
  } 

}
