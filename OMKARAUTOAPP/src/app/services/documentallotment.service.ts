
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Documentallotmentmodel } from '../models/documentallotmentmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Documentallotmentlistmodel } from '../models/documentallotmentlistmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Schedulemodel } from 'src/app/models/schedulemodel';

@Injectable({
  providedIn: 'root'
})
export class DocumentallotmentService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
 
  
  selectedDocumentallotmentdetails= new Documentallotmentmodel();
  constructor(private httpClient: HttpClient) { }

  setDocumentallotmentDetails(documentallotment: Documentallotmentmodel) { 
      this.selectedDocumentallotmentdetails = documentallotment;
  }
 
  getDocumentallotmentDetails() {
    return this.selectedDocumentallotmentdetails;
  }
  clearDocumentallotmentDetails() {
    this.selectedDocumentallotmentdetails = new Documentallotmentmodel();
  }
  documentallotmentSubmitted(user: Documentallotmentmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/DocumentallotmentSave', user, this.httpOptions);
  }
  documentallotmentDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/DocumentAllotmentDelete', req, this.httpOptions);
  } 
  getDocumentallotmentList(filter: Filtermodel): Observable<Documentallotmentlistmodel> {
    return this.httpClient.post<Documentallotmentlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDocumentAllotmentList', filter, this.httpOptions);
  }    
  getDocumentNumcode(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDocumentNumcode', req, this.httpOptions);
  }
  chkDocumentRange(req: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDocumentRange', req, this.httpOptions);
  }
  
  checkDocumentllpRange(req: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDocumentllpRange', req, this.httpOptions);
  }
  
}

