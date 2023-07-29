import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Loginmodel } from '../models/loginmodel';
import { Intermediatescreenmodel } from '../models/intermediatescreenmodel';
import { LoggedinUsermodel } from '../models/loggedinusermodel';
import { Responsemodel } from '../models/responsemodel';

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
  
  intermediateScreenSubmitted(login : Intermediatescreenmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Login/IntermediateScreenDetail', login, this.httpOptions);
  }
 

  getMenuList(userID : string): Observable<any> {
    return this.httpClient.get<any>(Constants.API_ENDPOINT + 'Login/MenuDetails/' + userID, this.httpOptions);
  }
}
