import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Sparespurchasemastermodel } from '../models/sparespurchasemastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Sparespurchasemasterlistmodel } from '../models/sparespurchasemasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class SparesPurchaseMasterService {

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


  selectedSparesPurchaseMaster = new Sparespurchasemastermodel();
  constructor(private httpClient: HttpClient) { }


  setSparesPurchaseDetails(tyremaster:Sparespurchasemastermodel) {
      this.selectedSparesPurchaseMaster = tyremaster;      
  }

  getSparesPurchaseMasterDetails() {
    return this.selectedSparesPurchaseMaster;
  }
  clearSparesPurchaseMasterDetails() {
    this.selectedSparesPurchaseMaster = new Sparespurchasemastermodel();
  }
  SparesPurchaseMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/SalesPurchaseMasterDelete', req, this.httpOptions);
  }
  chkSparesNoDuplicate(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ChkTyreNoDuplicate', req, this.httpOptions);
  }
  getSparesPurchaseMasterInnerGridList(request: Requestmodel): Observable<Sparespurchasemastermodel> {
    return this.httpClient.post<Sparespurchasemastermodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSalesPurchaseMasterInnerGridList', request, this.httpOptions);
  }
  sparesPurchaseMasterSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/SparesPurchaseMasterSave', user, this.httpformOptions);
  }
  getSparesPurchaseMasterList(filter: Filtermodel): Observable<Sparespurchasemasterlistmodel> {
    return this.httpClient.post<Sparespurchasemasterlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSparesPurchaseMasterList', filter, this.httpOptions);
  }  
}
