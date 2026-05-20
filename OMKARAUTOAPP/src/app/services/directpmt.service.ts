import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from '../models/reportmodel';
import { Responsemodel } from '../models/responsemodel';
import { Directpmtlistmodel } from '../models/directpmtlistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Requestmodel } from '../models/requestmodel';


@Injectable({
  providedIn: 'root'
})

export class DirectpmtService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }


  getDirectPaymentList(filter: Reportmodel): Observable<Directpmtlistmodel> {
    return this.httpClient.post<Directpmtlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetDirectPaymentList', filter, this.httpOptions);
  }
  downLoadDirectExcel(request: Directpmtlistmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DownLoadDirectExcel', request, this.httpOptions);
  }
  getDirectBankList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetDirectBankList', null, this.httpOptions);
  }  
  getPmtList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetPmtList', null, this.httpOptions);
  }  
  getDirectPmtDownloadedList(filter: Reportmodel): Observable<Directpmtlistmodel> {
    return this.httpClient.post<Directpmtlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetDirectPmtDownloadedList', filter, this.httpOptions);
  }
  updateDirectPmt(request: Directpmtlistmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/UpdateDirectPmt', request, this.httpOptions);
  }
}
