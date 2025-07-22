import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Roletypemodel } from '../models/roletypemodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import { Roletypelistmodel } from '../models/roletypelistmodel';

@Injectable({
  providedIn: 'root'
})
export class RoleTypeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedRoletype = new Roletypemodel();
  constructor(private httpClient: HttpClient) { }
  setRoleTypesDetails(roletypes: Roletypemodel) {
 
      this.selectedRoletype = roletypes;
    
  
  }
  getroletypeDetails() {
    return this.selectedRoletype;
  }
    roleTypesDelete(request: Requestmodel ):  Observable<Responsemodel> {
     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Admin/RoleTypesDelete', request, this.httpOptions);
    }
  
    chkDesc(request: Requestmodel ): Observable<Responsemodel> {
     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Admin/ChkDuplicateRoleDesc', request, this.httpOptions);
    }
     chkName(request: Requestmodel ): Observable<Responsemodel> {
     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Admin/ChkDuplicateRoleName', request, this.httpOptions);
    }
  clearRoletypesDetails() {
    this.selectedRoletype = new Roletypemodel();
  }
  roletypeDetailsSubmitted(user: Roletypemodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Admin/RoleMasterSave', user, this.httpOptions);
  }
  getRoleTypeList(filter: Filtermodel): Observable<Roletypelistmodel> {
    return this.httpClient.post<Roletypelistmodel>(Constants.API_ENDPOINT + 'Admin/GetRoleMasterList', filter, this.httpOptions);
  }
}
