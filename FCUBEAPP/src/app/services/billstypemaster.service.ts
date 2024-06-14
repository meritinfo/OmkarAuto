import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Billstypemodel } from '../models/billstypemastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from '../common/constants';
import { Billstypelistmodel } from '../models/billstypemasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class BillsTypeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedBillsType = new Billstypemodel();
  constructor(private httpClient: HttpClient) { }
  setBillsTypeDetails(Branch: Billstypemodel) {
 
      this.selectedBillsType = Branch;
    
  
  }
  getBillsTypeDetails() {
    return this.selectedBillsType;
  }
  clearBillsTypeDetails() {
    this.selectedBillsType = new Billstypemodel();
  }
  billsTypeDetailsSubmitted(user: Billstypemodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BillsTypeSave', user, this.httpOptions);
  }
  getBillsTypeList(filter: Filtermodel): Observable<Billstypelistmodel> {
    return this.httpClient.post<Billstypelistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsTypeList', filter, this.httpOptions);
  }

  billsTypeDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BillsTypeDelete', req, this.httpOptions);
  }

  chkCodeExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkCodeExits', request, this.httpOptions);
  }
  checkDuplicateBillType(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateBillType', req, this.httpOptions);
  }
  chkBranchNameExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkBranchNameExits', request, this.httpOptions);
  }
}
