import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Ptslabmastermodel } from '../models/ptslabmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Ptslabmasterlistmodel } from '../models/ptslabmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class PtSlabMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedPtslabmaster = new Ptslabmastermodel();
  constructor(private httpClient: HttpClient) { }
  setPtSlabMasterDetails(ratetypes: Ptslabmastermodel) {
 
      this.selectedPtslabmaster= ratetypes;
    
  
  }
  getPtSlabmasterDetails() {
    return this.selectedPtslabmaster;
  }
  ptSlabMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Admin/PtSlabMasterDelete', req, this.httpOptions);
  }
  clearPtSlabMasterDetails() {
    this.selectedPtslabmaster = new Ptslabmastermodel();
  }
  ptSlabMasterSubmitted(user: Ptslabmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Admin/PtSlabMasterSave', user, this.httpOptions);
  }
  getPtSlabMasterList(filter: Filtermodel): Observable<Ptslabmasterlistmodel> {
    return this.httpClient.post<Ptslabmasterlistmodel>(Constants.API_ENDPOINT + 'Admin/GetPtSlabMasterList', filter, this.httpOptions);
  }
}
