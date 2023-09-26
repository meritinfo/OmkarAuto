import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dieselstatementmodel } from '../models/dieselstatementmodel';
import { Dieselstatementsearchlistrequestmodel } from '../models/dieselstatementsearchlistrequestmodel';
import { Dieselstatementsearchlistmodel } from '../models/dieselstatementsearchlistmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class DieselstatementService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }

  getDieselStatementSearchList(request: Dieselstatementsearchlistrequestmodel): Observable<Dieselstatementsearchlistmodel> {
    return this.httpClient.post<Dieselstatementsearchlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStatementSearchList', request, this.httpOptions);
  }
}
