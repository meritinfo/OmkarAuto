import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Branchmodel } from '../models/branchmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from '../common/constants';
import { Branchmasterlistmodel } from '../models/branchmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class BranchMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedBranchMaster = new Branchmodel();
  constructor(private httpClient: HttpClient) { }
  setBranchMasterDetails(Branch: Branchmodel) {
 
      this.selectedBranchMaster = Branch;
    
  
  }
  getBranchMasterDetails() {
    return this.selectedBranchMaster;
  }
  clearBranchMasterDetails() {
    this.selectedBranchMaster = new Branchmodel();
  }
  branchMasterDetailsSubmitted(user: Branchmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BranchMasterDetailsSave', user, this.httpOptions);
  }
  getBranchMasterList(filter: Filtermodel): Observable<Branchmasterlistmodel> {
    return this.httpClient.post<Branchmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBranchMasterList', filter, this.httpOptions);
  }

  branchMasterDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BranchMasterDetailsDelete', req, this.httpOptions);
  }

  chkCodeExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkCodeExits', request, this.httpOptions);
  }
  chkBranchNameExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkBranchNameExits', request, this.httpOptions);
  }
}
