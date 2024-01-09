import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Roletypemodel } from '../models/roletypemodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
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
