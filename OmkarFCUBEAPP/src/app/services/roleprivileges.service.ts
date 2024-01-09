import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Roleprivilegeslistmodel } from '../models/roleprivilegeslistmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class RoleprivilegesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }

  rolePrivilegesSubmitted(ratesMaster: Roleprivilegeslistmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Admin/RolePrivilegesListSave', ratesMaster, this.httpOptions);
  }

  getRolePrivilegesList(req: Requestmodel): Observable<Roleprivilegeslistmodel> {
    return this.httpClient.post<Roleprivilegeslistmodel>(Constants.API_ENDPOINT + 'Admin/GetRolePrivileges', req, this.httpOptions);
  }

  getRoleTypesList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Admin/GetRoleTypeList', null, this.httpOptions);
  }

}
