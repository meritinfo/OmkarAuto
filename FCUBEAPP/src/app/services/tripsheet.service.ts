import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Tripsheetmodel } from '../models/tripsheetmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Reportmodel } from '../models/reportmodel';
import { Constants } from '../common/constants';
import { Tripsheetlistmodel } from '../models/tripsheetlistmodel';
import { Requestmodel } from 'src/app/models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class TripSheetService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
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
  tripSheetDetailsDelete(user: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripMasterDelete', user, this.httpOptions);
  }
  getTripSheetList(filter: Reportmodel): Observable<Tripsheetlistmodel> {
    return this.httpClient.post<Tripsheetlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripSheetList', filter, this.httpOptions);
  }  
  getTripSheetInnerSearchList(request: Reportmodel): Observable<Tripsheetmodel> {
    return this.httpClient.post<Tripsheetmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripSheetInnerSearchList', request, this.httpOptions);
  }
  getTripSheetInnerGridList(request: Requestmodel): Observable<Tripsheetmodel> {
    return this.httpClient.post<Tripsheetmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripSheetInnerGridList', request, this.httpOptions);
  }

  getOtherTripOpenList(filter: Reportmodel): Observable<Tripsheetlistmodel> {
    return this.httpClient.post<Tripsheetlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetOtherTripOpenList', filter, this.httpOptions);
  }  
  otherTripOpenDetailsSubmitted(user: Tripsheetmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/OtherTripOpenSave', user, this.httpOptions);
  }
  otherTripOpenDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/OtherTripOpenDelete', req, this.httpOptions);
  }   
  getNextTripNo(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetNextTripNo', payload, this.httpOptions);
  }
  
  getTripPrintPdf(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripPrintPdf', req, this.httpOptions);
  }
}
