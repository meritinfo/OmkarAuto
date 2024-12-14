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
  clearPtSlabMasterDetails() {
    this.selectedPtslabmaster = new Ptslabmastermodel();
  }
  
  ptSlabMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/PtSlabMasterDelete', req, this.httpOptions);
  }
  ptSlabMasterSubmitted(user: Ptslabmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/PtSlabMasterSave', user, this.httpOptions);
  }
  getPtSlabMasterList(filter: Filtermodel): Observable<Ptslabmasterlistmodel> {
    return this.httpClient.post<Ptslabmasterlistmodel>(Constants.API_ENDPOINT + 'HRMaster/GetPtSlabMasterList', filter, this.httpOptions);
  }
}
