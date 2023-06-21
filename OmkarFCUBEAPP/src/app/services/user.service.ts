import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Usermodel } from '../models/usermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable, Subject } from 'rxjs';
import { Constants } from '../common/constants';
import { Filtermodel } from '../models/filtermodel';
import { Userlistmodel } from '../models/userlistmodel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }

  formDataOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }

  selectedUser = new Usermodel();

  constructor(private httpClient: HttpClient) { }

  setUserDetails(user: Usermodel) {
    this.selectedUser = user;
  }
  getUserDetails() {
    return this.selectedUser;
  }
  clearUserDetails() {
    this.selectedUser = new Usermodel();
  }

  usernameValidation(user: Usermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Admin/UsernameValidation', user, this.httpOptions);
  }

  userDetailsSubmitted(userMasterModel: Usermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Admin/UserMasterDetailsSave', userMasterModel, this.httpOptions);
  }

  getUserMasterList(filter: Filtermodel): Observable<Userlistmodel> {
    return this.httpClient.post<Userlistmodel>(Constants.API_ENDPOINT + 'Admin/GetUserMasterList', filter, this.httpOptions);
  }

}
