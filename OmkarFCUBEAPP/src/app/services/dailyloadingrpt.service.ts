import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dailyloadingrptlistmodel  } from 'src/app/models/dailyloadingrptlistmodel';
import { Dailyloadingrptmodel } from 'src/app/models/dailyloadingrptmodel';

@Injectable({
  providedIn: 'root'
})

export class DailyloadingrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  selectedDailyloadingrptmodel = new Dailyloadingrptmodel();
  constructor(private httpClient: HttpClient) { }
  
  setDailyloadingrptDetails(dailyloadingrpt: Dailyloadingrptmodel) { 
      this.selectedDailyloadingrptmodel = dailyloadingrpt;  
  }
  
  getDailyloadingrptDetails() {
    return this.selectedDailyloadingrptmodel;
  }

  getDailyloadingrptList(filter: Reportmodel): Observable<Dailyloadingrptlistmodel> {
    return this.httpClient.post<Dailyloadingrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDailyLoadingRptList', filter, this.httpOptions);
  }  
  getDailyloadingrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDailyLoadingRptExcel', filter, this.httpOptions);
  }    

}
