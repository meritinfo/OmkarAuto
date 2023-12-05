import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Billstatementsearchlistrequestmodel } from '../models/billstatementsearchlistrequestmodel';
import { Billstatementsearchlistmodel } from '../models/billstatementsearchlistmodel';
import { Constants } from '../common/constants';
import { Filtermodel } from '../models/filtermodel';
import { Observable } from 'rxjs';
import { Responsemodel } from '../models/responsemodel';
import { Billstatementsaverequest } from '../models/billstatementsaverequest';
import { Billstatementlistmodel } from '../models/billstatementlistmodel';
import { billstatementmodel } from '../models/billstatementmodel';

@Injectable({
  providedIn: 'root'
})
export class BillstatementService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }
  selectedBillStatement = new billstatementmodel();
  setBillStatementDetails(docrenewalmaster: billstatementmodel) {
 
    this.selectedBillStatement = docrenewalmaster;
  

}
  clearBillStatementDetails() {
    this.selectedBillStatement= new billstatementmodel();
  }

  getBillStatementSearchList(request: Billstatementsearchlistrequestmodel): Observable<Billstatementsearchlistmodel> {
    return this.httpClient.post<Billstatementsearchlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetBillStatementSearchList', request, this.httpOptions);
  }
  getBillStatementList(filter: Filtermodel): Observable<Billstatementlistmodel> {
    return this.httpClient.post<Billstatementlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetBillStatementList', filter, this.httpOptions);
  }

  saveBillStatementDetails(request: billstatementmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/SaveBillStatementDetails', request, this.httpOptions);
  }


}
