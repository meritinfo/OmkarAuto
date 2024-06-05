import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Classificationmastermodel } from '../models/classificationmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import {Classificationmasterlistmodel } from '../models/classificationmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class ClassificationMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedclassificationmaster = new Classificationmastermodel();
  constructor(private httpClient: HttpClient) { }
  setClassificationMasterDetails(classificationmaster:Classificationmastermodel) {
 
      this.selectedclassificationmaster =classificationmaster;
    
  
  }
  getClassificationMasterDetails() {
    return this.selectedclassificationmaster;
  }
  classificationMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ClassificationMasterDelete', req, this.httpOptions);
  }
  checkDuplicateClass(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateClass', req, this.httpOptions);
  }
  clearClassificationMasterDetails() {
    this.selectedclassificationmaster = new Classificationmastermodel();
  }
 classificationmasterSubmitted(user:Classificationmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ClassificationMasterSave', user, this.httpOptions);
  }
  getClassificationMasterList(filter: Filtermodel): Observable<Classificationmasterlistmodel> {
    return this.httpClient.post<Classificationmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetClassificationMasterList', filter, this.httpOptions);
  }
}
