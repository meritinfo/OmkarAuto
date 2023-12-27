import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Gstpurchasemodel  } from '../models/gstpurchasemodel';
import { Gstpurchaselistmodel } from '../models/gstpurchaselistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Pagerequestwithdatesmodel } from '../models/pagerequestwithdatesmodel';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class GstpurchaseService {
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
  selectedGstPurchage = new Gstpurchasemodel();
  constructor(private httpClient: HttpClient) { }
  setGstPurchageDetails(Fingroup: Gstpurchasemodel) { 
      this.selectedGstPurchage = Fingroup; 
  }
  
  getGstPurchageDetails() {
    return this.selectedGstPurchage;
  }

  clearGstPurchageDetails() {
    this.selectedGstPurchage = new Gstpurchasemodel();
  }

  gstPurchageDetailsSubmitted(gstpur: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GstPurchaseMstSave', gstpur, this.httpformOptions);
  }

  getGstPurchageList(filter: Pagerequestwithdatesmodel): Observable<Gstpurchaselistmodel> {
    return this.httpClient.post<Gstpurchaselistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetGstPurchaseList', filter, this.httpOptions);
  }  

  getGstPurchageInnerGridList(request: Requestmodel): Observable<Gstpurchasemodel> {
    return this.httpClient.post<Gstpurchasemodel>(Constants.API_ENDPOINT + 'FinTrans/GetGstPurchaseInnerGridList', request, this.httpOptions);
  }

  gstPurchageDetailsDelete(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GstPurchageDelete', request, this.httpOptions);
  }

  getVendorList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetGstVendorList', null, this.httpOptions);
  }
  
}
