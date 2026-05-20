import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Loginmodel } from '../models/loginmodel';
import { Intermediatescreenmodel } from '../models/intermediatescreenmodel';
import { LoggedinUsermodel } from '../models/loggedinusermodel';
import { Responsemodel } from '../models/responsemodel';
import { Docrenewalmodel } from '../models/docrenewalmodel';
import { Datemodel } from '../models/datemodel';
import { Requestmodel } from '../models/requestmodel';

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
  loading: boolean = false;

  constructor(private httpClient: HttpClient) { }
    
  loginSubmitted(login : Loginmodel): Observable<LoggedinUsermodel> {
    return this.httpClient.post<LoggedinUsermodel>(Constants.API_ENDPOINT + 'Login/LoginDetails', login, this.httpOptions);
  }
  generateOTP(login : Loginmodel): Observable<LoggedinUsermodel> {
    return this.httpClient.post<LoggedinUsermodel>(Constants.API_ENDPOINT + 'Login/GenerateLoginOTP', login, this.httpOptions);
  }
  refreshToken(request : Loginmodel): Observable<LoggedinUsermodel> {
    return this.httpClient.post<LoggedinUsermodel>(Constants.API_ENDPOINT + 'Login/RefreshToken', request, this.httpOptions);
  }  
  intermediateScreenSubmitted(login : Intermediatescreenmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Login/IntermediateScreenDetail', login, this.httpOptions);
  }
  checkBookingdate(login : Datemodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Login/CheckBookingDate', login, this.httpOptions);
  }
 

  getMenuList(userID : string): Observable<any> {
    return this.httpClient.get<any>(Constants.API_ENDPOINT + 'Login/MenuDetails/' + userID, this.httpOptions);
  }
  getCompanyDetail(): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Login/GetCompanyDetail',null, this.httpOptions);
  }
  getCompanyShortCode(): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Login/GetCompanyShortCode',null, this.httpOptions);
  }
  getDashboardDetail(req:Requestmodel): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Login/GetDashboardDetail',req, this.httpOptions);
  }
  getDocRenewalDetails(): Observable<Docrenewalmodel[]> { 
    return this.httpClient.post<Docrenewalmodel[]>(Constants.API_ENDPOINT + 'Login/GetDocRenewalDetails/' ,null, this.httpOptions);
  }
  
}
