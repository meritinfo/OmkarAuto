import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Billstatementsearchlistrequestmodel } from '../models/billstatementsearchlistrequestmodel';
import { Billstatementsearchlistmodel } from '../models/billstatementsearchlistmodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
import { Responsemodel } from '../models/responsemodel';
import { Billstatementsaverequest } from '../models/billstatementsaverequest';

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

  saveBillStatementDetails(request: Billstatementsaverequest): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/SaveBillStatementDetails', request, this.httpOptions);
  }

}
