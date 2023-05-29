import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Productmastermodel } from '../models/productmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Productmasterlistmodel } from '../models/productmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class ProductMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }
  selectedProductMaster = new Productmastermodel();
  constructor(private httpClient: HttpClient) { }
  setProductMasterDetails(ProductMaster: Productmastermodel) {
 
      this.selectedProductMaster = ProductMaster;
    
  
  }
  getProductMasterDetails() {
    return this.selectedProductMaster;
  }
  clearProductMasterDetails() {
    this.selectedProductMaster = new Productmastermodel();
  }
  productmasterDetailsSubmitted(user: Productmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ProductMasterSave', user, this.httpOptions);
  }
  getProductMasterList(filter: Filtermodel): Observable<Productmasterlistmodel> {
    return this.httpClient.post<Productmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetProductMasterList', filter, this.httpOptions);
  }
}
