import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Loginmodel } from '../models/loginmodel';
import { LoggedinUsermodel } from '../models/loggedinusermodel';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  loggedInStatus: boolean = false;

  constructor(private httpClient: HttpClient) { }

  loginSubmitted(login : Loginmodel): Observable<LoggedinUsermodel> {
    return this.httpClient.post<LoggedinUsermodel>(Constants.API_ENDPOINT + 'Login/LoginDetails', login, this.httpOptions);
  }
}
