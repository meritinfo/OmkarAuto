import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Reportmodel } from '../models/reportmodel';
import { Constants } from '../common/constants';
import { Tripmastermodel } from '../models/tripmastermodel';
import { Tripmasterlistmodel } from '../models/tripmasterlistmodel';
import { Tripsheetmodel } from '../models/tripsheetmodel';
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
  selectedTripMaster = new Tripmastermodel();
  selectedTripSheet = new Tripsheetmodel();

  constructor(private httpClient: HttpClient) { }
  
  
  setTripMasterDetails(Trip: Tripmastermodel) {
    this.selectedTripMaster = Trip;  
  }
  getTripMasterDetails() {
    return this.selectedTripMaster;
  }
  clearTripMasterDetails() {
    this.selectedTripMaster = new Tripmastermodel();
  }
  tripMasterDetailsSubmitted(user: Tripmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripMasterSave', user, this.httpOptions);
  }
  tripMasterDetailsDelete(user: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripMasterDelete', user, this.httpOptions);
  }
  getTripMasterList(filter: Reportmodel): Observable<Tripmasterlistmodel> {
    return this.httpClient.post<Tripmasterlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripMasterList', filter, this.httpOptions);
  }  
  getTripMasterInnerSearchList(request: Reportmodel): Observable<Tripmastermodel> {
    return this.httpClient.post<Tripmastermodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripMasterInnerSearchList', request, this.httpOptions);
  }
  getTripMasterInnerGridList(request: Requestmodel): Observable<Tripmastermodel> {
    return this.httpClient.post<Tripmastermodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripMasterInnerGridList', request, this.httpOptions);
  }

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
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripSheetSave', user, this.httpOptions);
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

  getNextTripNo(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetNextTripNo', payload, this.httpOptions);
  }  
  getNextTripSalDate(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetNextTripSalDate', payload, this.httpOptions);
  }  
  getTripPrintPdf(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripPrintPdf', req, this.httpOptions);
  }
  getTripJetPrintPdf(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripJetPrintPdf', req, this.httpOptions);
  }

}
