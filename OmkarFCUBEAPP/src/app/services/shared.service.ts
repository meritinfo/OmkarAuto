import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Loginmodel } from '../models/loginmodel';
import { Usermodel } from '../models/usermodel';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  loginSubmitted(login : Loginmodel): Observable<Usermodel> {
    return this.httpClient.post<Usermodel>(Constants.API_ENDPOINT + 'Login/LoginDetails', login, this.httpOptions);
  }
}
