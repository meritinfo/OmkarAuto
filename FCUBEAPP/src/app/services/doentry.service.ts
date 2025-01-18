import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Constants } from '../common/constants';
import { Domodel } from '../models/domodel';
import { Dolistmodel } from '../models/dolistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Dovehiplacedmodel } from '../models/dovehiplacedmodel';
import { Dovehiplacedlistmodel } from '../models/dovehiplacedlistmodel';

@Injectable({
  providedIn: 'root'
})
export class DoentryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selecteddo = new Domodel();
  selecteddoVehi = new Dovehiplacedmodel();

  constructor(private httpClient: HttpClient) { }

  setDoDetails(dos: Domodel) { 
      this.selecteddo = dos;   
  }
  
  getDoDetails() {
    return this.selecteddo;
  }

  clearDoDetails() {
    this.selecteddo = new Domodel();
  }

  doSubmitted(dos: Domodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DoSave', dos, this.httpOptions);
  }

  getDoList(filter: Reportmodel): Observable<Dolistmodel> {
    return this.httpClient.post<Dolistmodel>(Constants.API_ENDPOINT + 'Consignment/GetDoList', filter, this.httpOptions);
  } 

  doDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DoDelete', req, this.httpOptions);
  }  

  setDoVehiDetails(dos: Dovehiplacedmodel) { 
    this.selecteddoVehi = dos;   
  }

  getDoVehiDetails() {
    return this.selecteddoVehi;
  }

  clearDoVehiDetails() {
    this.selecteddoVehi = new Dovehiplacedmodel();
  }

  getDoVehiPlacedDetails(filter: Requestmodel): Observable<Dovehiplacedmodel> {
    return this.httpClient.post<Dovehiplacedmodel>(Constants.API_ENDPOINT + 'Consignment/GetDoVehiDetails', filter, this.httpOptions);
  } 
  
  getDoVehiPlacedList(filter: Reportmodel): Observable<Dovehiplacedlistmodel> {
    return this.httpClient.post<Dovehiplacedlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetDoVehiPlacedList', filter, this.httpOptions);
  } 
  
  doVehiPlacedSubmitted(dos: Dovehiplacedmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DoVehiPlacedSave', dos, this.httpOptions);
  }
  
  doVehiPlacedDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DoVehiPlacedDelete', req, this.httpOptions);
  }  
}


