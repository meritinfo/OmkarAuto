import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dieselstatementsearchlistrequestmodel } from '../models/dieselstatementsearchlistrequestmodel';
import { Dieselstatementsearchlistmodel } from '../models/dieselstatementsearchlistmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dieselstatementsaverequest } from '../models/dieselstatementsaverequest';
import { Responsemodel } from '../models/responsemodel';

@Injectable({
  providedIn: 'root'
})
export class DieselstatementService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }

  getDieselStatementSearchList(request: Dieselstatementsearchlistrequestmodel): Observable<Dieselstatementsearchlistmodel> {
    return this.httpClient.post<Dieselstatementsearchlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStatementSearchList', request, this.httpOptions);
  }

  saveDieselStatementDetails(request: Dieselstatementsaverequest): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/SaveDieselStatementDetails', request, this.httpOptions);
  }
}
