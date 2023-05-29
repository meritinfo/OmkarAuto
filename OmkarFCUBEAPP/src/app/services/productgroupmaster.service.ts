import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Productgroupmastermodel } from '../models/productgroupmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Productgroupmasterlistmodel } from '../models/productgroupmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }
  selectedProductgroupmaster = new Productgroupmastermodel();
  constructor(private httpClient: HttpClient) { }
  setproductGroupMasterDetails(productgroupmaster: Productgroupmastermodel) {
 
      this.selectedProductgroupmaster = productgroupmaster;
    
  
  }
  getproductGroupMasterDetails() {
    return this.selectedProductgroupmaster;
  }
  clearProductGroupMasterDetails() {
    this.selectedProductgroupmaster = new Productgroupmastermodel();
  }
  productGroupMasterDetailsSubmitted(user: Productgroupmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ProductGroupMasterDetailsSave', user, this.httpOptions);
  }
  getProductGroupMasterList(filter: Filtermodel): Observable<Productgroupmasterlistmodel> {
    return this.httpClient.post<Productgroupmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetProductGroupMasterList', filter, this.httpOptions);
  }
}
