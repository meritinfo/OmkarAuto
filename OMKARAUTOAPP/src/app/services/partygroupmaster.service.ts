
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Partygroupmastermodellist  } from '../models/partygroupmastermodellist';
import { Partygroupmastermodel } from 'src/app/models/partygroupmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class PartygroupmasterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedpartygroup = new Partygroupmastermodel();
  constructor(private httpClient: HttpClient) { }
  setpartygroupmastersDetails(partygroupmaster: Partygroupmastermodel) {
 
      this.selectedpartygroup = partygroupmaster;
  }
  getPartygroupmasterDetails() {
    return this.selectedpartygroup;
  }
  clearpartygroupmastersDetails() {
    this.selectedpartygroup = new Partygroupmastermodel();
  }
  partygroupmasterSubmitted(user: Partygroupmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/PartyGroupMasterSave', user, this.httpOptions);
  }
  getpartygroupmasterList(filter: Filtermodel): Observable<Partygroupmastermodellist> {
    return this.httpClient.post<Partygroupmastermodellist>(Constants.API_ENDPOINT + 'FreightMasters/GetPartyGroupMasterlist', filter, this.httpOptions);
  }
  // getpartygroupmasterList(request: Requestmodel): Observable<Partygroupmastermodel> {
  //   return this.httpClient.post<Partygroupmastermodel>(Constants.API_ENDPOINT + 'FreightMasters/GetPartyGroupMasterlist', request, this.httpOptions);
  // }

  deletepartygroupmaster(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/PartyGroupMasterDelete', req, this.httpOptions);
  }
  getPartyGroupDetailInnergrid(request: Requestmodel): Observable<Partygroupmastermodel> {
    return this.httpClient.post<Partygroupmastermodel>(Constants.API_ENDPOINT + 'FreightMasters/GetPartyGroupDetailInnergrid', request, this.httpOptions);
  }
  getPartyList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetPartyList', null, this.httpOptions);
  }
}
