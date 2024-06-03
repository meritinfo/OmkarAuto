import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Billmastersearchlistrequestmodel } from '../models/billsmastersearchlistrequestmodel';
import { Billsmastersearchmodel } from '../models/billsmastersearchmodel';
import {Billsmastersearchlistmodel} from '../models/billsmastersearchlistmodel';
import { Pagerequestwithdatesmodel } from '../models/pagerequestwithdatesmodel';
import { Constants } from '../common/constants';
import { Reportmodel } from '../models/reportmodel';
import { Observable } from 'rxjs';
import { Responsemodel } from '../models/responsemodel';
import { Billstatementsaverequest } from '../models/billstatementsaverequest';
import { Billsmasterlistmodel } from '../models/billsmasterlistmodel';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';

import { Billsmastermodel } from '../models/billsmastermodel';

@Injectable({
    providedIn: 'root'
  })
  export class BillsMasterService {
  
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
      })
    }
  
    constructor(private httpClient: HttpClient) { }
    selectedBillsMasterDetails = new Billsmastermodel();
    setBillsMasterDetails(docrenewalmaster: Billsmastermodel) {
   
      this.selectedBillsMasterDetails = docrenewalmaster;
    
  
  }
  getBillsMasterDetails() {
    return this.selectedBillsMasterDetails;
  }
    clearBillsMasterDetails() {
      this.selectedBillsMasterDetails= new Billsmastermodel();
    }
    // getBillStatementSearchList(request: Billmastersearchlistrequestmodel): Observable<Billsmastersearchlistmodel> {
    //   return this.httpClient.post<Billmastersearchlistrequestmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsMasterSearchList', request, this.httpOptions);
    // }
    
    getBillsMasterSearchList(request: Pagerequestwithdatesmodel): Observable<Billsmastermodel> {
      return this.httpClient.post<Billsmastermodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsMasterSearchList', request, this.httpOptions);
    }
   
    getBillsMasterList(filter: Reportmodel): Observable<Billsmasterlistmodel> {
      return this.httpClient.post<Billsmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsMasterList', filter, this.httpOptions);
    }  
    getBillsStmtCreditAcList(): Observable<Dropdownmodel[]> {
      return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetBillsStmtCreditAcList', null, this.httpOptions);
    }
    billsMasterDelete(req: Requestmodel): Observable<Responsemodel> {
      return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BillsMasterDelete', req, this.httpOptions);
    }
  
    saveBillsMasterDetails(request: Billsmastermodel): Observable<Responsemodel> {
      return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BillsMasterSave', request, this.httpOptions);
    }
    getBillsMasterInnerGridList(request: Requestmodel): Observable<Billsmastermodel> {
      return this.httpClient.post<Billsmastermodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsMasterInnerGridList', request, this.httpOptions);
    }
    
  
  
  }