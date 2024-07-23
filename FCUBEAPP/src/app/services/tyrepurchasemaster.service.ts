import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Tyrepurchasemastermodel } from '../models/tyrepurchasemastermodel';
import {Tyrepurchaseinnergridmodel } from 'src/app/models/tyrepurchaseinnergridmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import {Tyrepurchasemasterlistmodel } from '../models/tyrepurchasemastermodellist';
import {Transportmasterinnergridmodel } from '../models/transportmasterinnergridmodel';

@Injectable({
  providedIn: 'root'
})
export class TyrePurchaseMasterService {

  httpOptions = {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  httpformOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }


  selectedTyrePurchaseMaster = new Tyrepurchasemastermodel();
  constructor(private httpClient: HttpClient) { }


  setTransportMasterDetails(tyremaster:Tyrepurchasemastermodel) {
      this.selectedTyrePurchaseMaster = tyremaster;      
  }

  getTyrePurchaseMasterDetails() {
    return this.selectedTyrePurchaseMaster;
  }
  clearTyrePurchaseMasterDetails() {
    this.selectedTyrePurchaseMaster = new Tyrepurchasemastermodel();
  }
  TyrePurchaseMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyrePurchaseMasterDelete', req, this.httpOptions);
  }
  chkTyreNoDuplicate(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ChkTyreNoDuplicate', req, this.httpOptions);
  }
  getTyrePurchaseMasterInnerGridList(request: Requestmodel): Observable<Tyrepurchaseinnergridmodel> {
    return this.httpClient.post<Tyrepurchaseinnergridmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyrePurchaseMasterInnerGridList', request, this.httpOptions);
  }
  tyrePurchaseMasterSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyrePurchaseMasterSave', user, this.httpformOptions);
  }
  getTyrePurchaseMasterList(filter: Filtermodel): Observable<Tyrepurchasemasterlistmodel> {
    return this.httpClient.post<Tyrepurchasemasterlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyrePurchaseMasterList', filter, this.httpOptions);
  }
  
}
