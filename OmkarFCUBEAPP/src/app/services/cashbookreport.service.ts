import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
import { Cashbookreportrequestmodel } from '../models/cashbookreportrequestmodel.model';

@Injectable({
  providedIn: 'root'
})
export class CashbookreportService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }

  getCashBookReport(request: Cashbookreportrequestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/CashBookReport', request, this.httpOptions);
  }
}
