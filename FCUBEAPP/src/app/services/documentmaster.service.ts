
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Documentmastermodel } from '../models/documentmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Documentmasterlistmodel } from '../models/documentmasterlist';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Schedulemodel } from 'src/app/models/schedulemodel';

@Injectable({
  providedIn: 'root'
})
export class DocumentMasterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
 
  
  selectedDocumentallotmentdetails= new Documentmastermodel();
  constructor(private httpClient: HttpClient) { }

  setDocumentMasterDetails(documentallotment: Documentmastermodel) { 
      this.selectedDocumentallotmentdetails = documentallotment;
  }
 
  getDocumentMasterDetails() {
    return this.selectedDocumentallotmentdetails;
  }
  clearDocumentMasterDetails() {
    this.selectedDocumentallotmentdetails = new Documentmastermodel();
  }
  documentMasterSubmitted(user: Documentmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/DocumentMasterSave', user, this.httpOptions);
  }
  documentMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/DocumentMasterDelete', req, this.httpOptions);
  } 
  getDocumentMasterList(filter: Filtermodel): Observable<Documentmasterlistmodel> {
    return this.httpClient.post<Documentmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDocumentMasterList', filter, this.httpOptions);
  }    

  
}

