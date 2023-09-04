import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Tripsheetmodel } from '../models/tripsheetmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Tripsheetlistmodel } from '../models/tripsheetlistmodel';
import { Tripsheetinnergridmodel } from '../models/tripsheetinnergridmodel';
import { Tripsheetinnergridrequest } from '../models/tripsheetinnergridrequest';

@Injectable({
  providedIn: 'root'
})
export class TripSheetService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }
  selectedTripSheet = new Tripsheetmodel();
  constructor(private httpClient: HttpClient) { }
  setTripSheetDetails(Trip: Tripsheetmodel) {
 
      this.selectedTripSheet = Trip;
    
  
  }
  getTripSheetDetails() {
    return this.selectedTripSheet;
  }
  clearTripSheetDetails() {
    this.selectedTripSheet = new Tripsheetmodel();
  }
  tripSheetDetailsSubmitted(user: Tripsheetmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripMasterSave', user, this.httpOptions);
  }
  getTripSheetList(filter: Filtermodel): Observable<Tripsheetlistmodel> {
    return this.httpClient.post<Tripsheetlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripSheetList', filter, this.httpOptions);
  }
  getTripSheetInnerGridList(request: Tripsheetinnergridrequest): Observable<Tripsheetinnergridmodel> {
    return this.httpClient.post<Tripsheetinnergridmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripSheetInnerGridList', request, this.httpOptions);
  }
}
