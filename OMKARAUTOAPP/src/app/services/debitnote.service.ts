import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Constants } from '../common/constants';
import { Debitnotelistmodel } from '../models/debitnotelistmodel';
import { Debitnotemodel } from '../models/debitnotemodel';
import { Panvalidapiresultmodel } from '../models/panvalidapiresultmodel';
@Injectable({
  providedIn: 'root'
})
export class DebitNoteService {
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
  selectedDebit = new Debitnotemodel();

  constructor(private httpClient: HttpClient) { }
  setDebitNoteDetails(docrenewalmaster: Debitnotemodel) { 
      this.selectedDebit = docrenewalmaster;  
  }
  
  getDebitNoteDetails() {
    return this.selectedDebit;
  }
  clearDebitDetails() {
    this.selectedDebit = new Debitnotemodel();
  }
  creditnoteDetailsSubmitted(user: Debitnotemodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DebitNoteEntrySave', user, this.httpformOptions);
  }
  getDebitNoteSlNo(request: Requestmodel ):  Observable<Responsemodel> {
      return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetDebitSlNo', request, this.httpOptions);
   }
  getDebitNoteList(filter: Reportmodel): Observable<Debitnotelistmodel> {
    return this.httpClient.post<Debitnotelistmodel>(Constants.API_ENDPOINT + 'Consignment/GetDebitNoteList', filter, this.httpOptions);
  }  

  debitNoteDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DebitNoteDelete', req, this.httpOptions);
  }  

  
}
