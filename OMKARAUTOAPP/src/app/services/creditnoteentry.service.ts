import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Constants } from '../common/constants';
import { Creditnoteentrylistmodel } from '../models/creditnoteentrylist';
import { Creditnoteentrymodel } from '../models/creditnoteentrymodel';

import { Panvalidapiresultmodel } from '../models/panvalidapiresultmodel';


@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  httpformOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedCredit = new Creditnoteentrymodel();

  constructor(private httpClient: HttpClient) { }
  setCreditNoteDetails(docrenewalmaster: Creditnoteentrymodel) { 
      this.selectedCredit = docrenewalmaster;  
  }
  
  getCreditNoteDetails() {
    return this.selectedCredit;
  }
  clearCreditDetails() {
    this.selectedCredit = new Creditnoteentrymodel();
  }
  creditnoteDetailsSubmitted(user: Creditnoteentrymodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CreditNoteEntrySave', user, this.httpformOptions);
  }
  getCreditNoteSlNo(request: Requestmodel ):  Observable<Responsemodel> {
      return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetCreditNoteSlNo', request, this.httpOptions);
   }
  getCreditNoteList(filter: Reportmodel): Observable<Creditnoteentrylistmodel> {
    return this.httpClient.post<Creditnoteentrylistmodel>(Constants.API_ENDPOINT + 'Consignment/GetCreditNoteList', filter, this.httpOptions);
  }  

  creditNoteDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CreditNoteDelete', req, this.httpOptions);
  }  
  getCreditNoteBillDetails(req: Reportmodel): Observable<Creditnoteentrymodel> {
    return this.httpClient.post<Creditnoteentrymodel>(Constants.API_ENDPOINT + 'Consignment/GetCreditNoteBillDetails', req, this.httpOptions);
  } 
  
}
