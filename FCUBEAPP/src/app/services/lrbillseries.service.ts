import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Lrbillseriesmodel } from '../models/lrbillseriesmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Lrbillserieslistmodel } from '../models/lrbillserieslistmodel';

@Injectable({
  providedIn: 'root'
})
export class LRBillSeriesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedLrbillseries = new Lrbillseriesmodel();
  constructor(private httpClient: HttpClient) { }
  setLrBillSeriesDetails(lrbillseries: Lrbillseriesmodel) {
 
      this.selectedLrbillseries = lrbillseries;
    
  
  }
  getLrbillSeriesDetails() {
    return this.selectedLrbillseries;
  }
  clearLrbillSeriesDetails() {
    this.selectedLrbillseries = new Lrbillseriesmodel();
  }
  LrbillseriesDetailsSubmitted(user: Lrbillseriesmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/LR_Bill_SeriesDetailsSave', user, this.httpOptions);
  }
  getLrbillseriesList(filter: Filtermodel): Observable<Lrbillserieslistmodel> {
    return this.httpClient.post<Lrbillserieslistmodel>(Constants.API_ENDPOINT + 'FreightMasters/LRBillSeriesList', filter, this.httpOptions);
  }
}
