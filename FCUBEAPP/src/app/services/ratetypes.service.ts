import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Ratetypesmodel } from '../models/ratetypesmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Ratetypeslistmodel } from '../models/ratetypeslistmodel';

@Injectable({
  providedIn: 'root'
})
export class RateTypesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedRatetypes = new Ratetypesmodel();
  constructor(private httpClient: HttpClient) { }
  setRateTypesDetails(ratetypes: Ratetypesmodel) {
 
      this.selectedRatetypes = ratetypes;
    
  
  }
  getratetypesDetails() {
    return this.selectedRatetypes;
  }
  clearRatetypesDetails() {
    this.selectedRatetypes = new Ratetypesmodel();
  }
  ratetypeDetailsSubmitted(user: Ratetypesmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/RateTypesDetailsSave', user, this.httpOptions);
  }
  getRatetypeList(filter: Filtermodel): Observable<Ratetypeslistmodel> {
    return this.httpClient.post<Ratetypeslistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetRateTypesList', filter, this.httpOptions);
  }
}
