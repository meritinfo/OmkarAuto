import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Gstpctvaluesmodel  } from '../models/gstpctvaluesmodel';
import { Gstpctvalueslistmodel } from '../models/gstpctvalueslistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Reportmodel } from '../models/reportmodel';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class GstPctValuesService {
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
  selectedGstpctValues = new Gstpctvaluesmodel();
  constructor(private httpClient: HttpClient) { }
  setGstPctValuesDetails(Fingroup: Gstpctvaluesmodel) { 
      this.selectedGstpctValues = Fingroup; 
  }
  
  getGstPctValuesDetails() {
    return this.selectedGstpctValues;
  }

  clearGstPctValuesDetails() {
    this.selectedGstpctValues = new Gstpctvaluesmodel();
  }

  gstPurchageDetailsSubmitted(gstpur: Gstpctvaluesmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GstPctValuesSave', gstpur, this.httpformOptions);
  }

  getGstpctvaluesmodelList(filter: Reportmodel): Observable<Gstpctvalueslistmodel> {
    return this.httpClient.post<Gstpctvalueslistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetGstPctValuesList', filter, this.httpOptions);
  }  

  

  gstGstPctValuesDelete(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetGstPctValuesDelete', request, this.httpOptions);
  }

  getVendorList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetGstVendorList', null, this.httpOptions);
  }
  
  getTdsAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetGstTdsAcList', null, this.httpOptions);
  }
  
}
