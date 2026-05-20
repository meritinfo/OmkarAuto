import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Lhpmslabmastermodel } from '../models/lhpmslabmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Lhpmslabmasterlistmodel } from '../models/lhpmslabmastermodellist';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class LhpmSlabMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedLhpmslabmaster = new Lhpmslabmastermodel();

  constructor(private httpClient: HttpClient) { }

  setLhpmSlabMasterDetails(docrenewalmaster: Lhpmslabmastermodel) { 
      this.selectedLhpmslabmaster = docrenewalmaster;  
  }
  
  getLhpmSlabMasterDetails() {
    return this.selectedLhpmslabmaster;
  }
  clearLhpmSlabMasterDetails() {
    this.selectedLhpmslabmaster = new Lhpmslabmastermodel();
  }
  lhpmSlabMasterDetailsSubmitted(user: Lhpmslabmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/LhpmSlabMasterSave', user, this.httpOptions);
  }
  getLhpmSlabMasterList(filter: Filtermodel): Observable<Lhpmslabmasterlistmodel> {
    return this.httpClient.post<Lhpmslabmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLhpmSlabMasterList', filter, this.httpOptions);
  }

  LhpmSlabMasterDelete(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/LhpmSlabMasterDelete', request, this.httpOptions);
  }

 
 
}
