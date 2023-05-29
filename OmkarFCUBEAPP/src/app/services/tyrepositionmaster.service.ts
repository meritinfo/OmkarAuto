import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Tyrepositionmastermodel } from '../models/tyrepositionmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Tyrepositionmasterlistmodel } from '../models/tyrepositionmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class TyrepositionMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }
  selectedTyrepositionmaster = new Tyrepositionmastermodel();
  constructor(private httpClient: HttpClient) { }
  setTyrepositionMasterDetails(tyrepositionmaster: Tyrepositionmastermodel) {
 
      this.selectedTyrepositionmaster = tyrepositionmaster;
    
  
  }
  getTyrepositionMasterDetails() {
    return this.selectedTyrepositionmaster;
  }
  clearTyrepositionMasterDetails() {
    this.selectedTyrepositionmaster = new Tyrepositionmastermodel();
  }
  tyrepositionMasterDetailsSubmitted(user: Tyrepositionmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/TyrePositionMasterSave', user, this.httpOptions);
  }
  getTyrepositionMasterList(filter: Filtermodel): Observable<Tyrepositionmasterlistmodel> {
    return this.httpClient.post<Tyrepositionmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetTyrePositionMasterList', filter, this.httpOptions);
  }
}
