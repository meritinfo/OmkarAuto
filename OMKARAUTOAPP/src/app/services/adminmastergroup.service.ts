import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Admingroupmastermodel } from '../models/admingroupmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from '../common/constants';
import { Admingroupmasterlistmodel } from '../models/admingroupmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class AdminGroupMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedAdminGroupMaster = new Admingroupmastermodel();
  constructor(private httpClient: HttpClient) { }
  setAdmingroupmasterDetails(Branch: Admingroupmastermodel) {
 
      this.selectedAdminGroupMaster = Branch;
    
  
  }
  getAdminGroupmasterDetails() {
    return this.selectedAdminGroupMaster;
  }
  clearAdminGroupMasterDetails() {
    this.selectedAdminGroupMaster = new Admingroupmastermodel();
  }
  AdminGroupMasterSubmitted(user: Admingroupmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/AdminGroupMasterSave', user, this.httpOptions);
  }
  getAdminGroupMasterList(filter: Filtermodel): Observable<Admingroupmasterlistmodel> {
    return this.httpClient.post<Admingroupmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAdminGroupMasterList', filter, this.httpOptions);
  }
  checkAdminGroupDesc(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateAdminGrpDesc', req, this.httpOptions);
  }
  getAdminSlNo(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAdminSortSlNo', request, this.httpOptions);
  } 
  

  adminGroupDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/AdminGroupMasterDelete', req, this.httpOptions);
  }

  chkCodeExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkCodeExits', request, this.httpOptions);
  }
//   checkDuplicateBillType(req: Requestmodel): Observable<Responsemodel> {
//     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateBillType', req, this.httpOptions);
//   }
  chkBranchNameExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkBranchNameExits', request, this.httpOptions);
  }
}
