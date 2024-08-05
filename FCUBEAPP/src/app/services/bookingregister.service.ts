
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Bookingregisterrptlistmodel  } from 'src/app/models/bookingregisterrptlistmodel';
import { Bookingregisterrptmodel } from 'src/app/models/bookingregisterrptmodel';


@Injectable({
  providedIn: 'root'
})
export class BookingregisterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getBookingregisterrptList(filter: Reportmodel): Observable<Bookingregisterrptlistmodel> {
    return this.httpClient.post<Bookingregisterrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBookingRegisterRptList', filter, this.httpOptions);
  }  
  getBookingregisterrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBookingRegisterRptExcel', filter, this.httpOptions);
  }    

}
