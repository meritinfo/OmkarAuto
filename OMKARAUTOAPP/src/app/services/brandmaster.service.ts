import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Brandmastermodel } from '../models/brandmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Brandmasterlistmodel } from '../models/brandmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class BrandMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedBrandmaster = new Brandmastermodel();
  constructor(private httpClient: HttpClient) { }
  setBrandMasterDetails(brandmaster: Brandmastermodel) {
 
      this.selectedBrandmaster = brandmaster;
    
  
  }
  getBrandMasterDetails() {
    return this.selectedBrandmaster;
  }
  brandMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/BrandMasterDelete', req, this.httpOptions);
  }
  clearBrandMasterDetails() {
    this.selectedBrandmaster = new Brandmastermodel();
  }
  brandMasterDetailsSubmitted(user: Brandmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/BrandMasterSave', user, this.httpOptions);
  }
  checkDuplicateBrand(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/CheckDuplicateBrand', req, this.httpOptions);
  }
  getBrandMasterList(filter: Filtermodel): Observable<Brandmasterlistmodel> {
    return this.httpClient.post<Brandmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetBrandMasterList', filter, this.httpOptions);
  }
}
