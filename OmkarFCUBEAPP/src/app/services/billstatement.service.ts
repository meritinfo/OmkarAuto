import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Billstatementsearchlistrequestmodel } from '../models/billstatementsearchlistrequestmodel';
import { Billstatementsearchlistmodel } from '../models/billstatementsearchlistmodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillstatementService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }

  getBillStatementSearchList(request: Billstatementsearchlistrequestmodel): Observable<Billstatementsearchlistmodel> {
    return this.httpClient.post<Billstatementsearchlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetBillStatementSearchList', request, this.httpOptions);
  }

}
