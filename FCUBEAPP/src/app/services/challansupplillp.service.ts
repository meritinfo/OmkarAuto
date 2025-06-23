import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Constants } from '../common/constants';
import { Challanlistmodel } from '../models/challanlistmodel';
import { Challanmastermodel } from '../models/challanmastermodel';


@Injectable({
  providedIn: 'root'
})
export class ChallansuppliServiceLLP {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  selectedChallan = new Challanmastermodel();

  constructor(private httpClient: HttpClient) { }

  setChallanDetails(challanmaster: Challanmastermodel) { 
      this.selectedChallan = challanmaster;  
  }
  
  getChallanDetails() {
    return this.selectedChallan;
  }
  clearChallanDetails() {
    this.selectedChallan = new Challanmastermodel();
  }
  challanDetailsSubmitted(challanmaster: Challanmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChallanSuppliSaveLLP', challanmaster, this.httpOptions);
  }
  getChallanList(filter: Reportmodel): Observable<Challanlistmodel> {
    return this.httpClient.post<Challanlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetChallanSuppliListLLP', filter, this.httpOptions);
  }  
  challanDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChallanSuppliDeleteLLP', req, this.httpOptions);
  }  
  checkDuplicateChallan(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/CheckDuplicateChallanSuppliLLP', req, this.httpOptions);
  }  
}
