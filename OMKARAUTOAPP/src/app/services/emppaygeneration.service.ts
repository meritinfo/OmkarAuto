import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Pagerequestwithdatesmodel } from '../models/pagerequestwithdatesmodel';
import { Constants } from '../common/constants';
import { Emppaygenmodel } from '../models/emppaygenmodel';
import { Emppaygenlist } from '../models/emppaygenlist';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Empleavemodel } from 'src/app/models/empleavemodel';
import { Reportmodel } from 'src/app/models/reportmodel';

@Injectable({
  providedIn: 'root'
})
export class EmppaygenerationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }

  getEmpPayGenerationList(filter: Pagerequestwithdatesmodel): Observable<Emppaygenlist> {
    return this.httpClient.post<Emppaygenlist>(Constants.API_ENDPOINT + 'HRMaster/GetEmpPayGenerationList', filter, this.httpOptions);
  }  
  
  empPayGenerationSubmitted(user: Emppaygenlist): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpPayGenerationSave', user, this.httpOptions);
  }
  
  empPayGenerationDelete(req: Pagerequestwithdatesmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpPayGenerationDelete', req, this.httpOptions);
  } 
}
  