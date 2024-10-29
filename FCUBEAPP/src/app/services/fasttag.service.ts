import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from '../models/reportmodel';
import { Responsemodel } from '../models/responsemodel';
import { Fasttaglistmodel } from '../models/fasttaglistmodel';
import { Fasttagmodel } from '../models/fasttagmodel';
import { Requestmodel } from '../models/requestmodel';


@Injectable({
  providedIn: 'root'
})

export class FasttagService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedFasttag= new Fasttagmodel();

  constructor(private httpClient: HttpClient) { }

  setFasttagDetails(docrenewalmaster: Fasttagmodel) { 
    this.selectedFasttag = docrenewalmaster; 
  }

  clearFasttagDetails() {
    this.selectedFasttag= new Fasttagmodel();
  }

  getFasttagDetails() {
    return this.selectedFasttag;
  }

  getFasttagList(filter: Reportmodel): Observable<Fasttaglistmodel> {
    return this.httpClient.post<Fasttaglistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetFastTagList', filter, this.httpOptions);
  }
  fasttagSave(request: Fasttagmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/FastTagSave', request, this.httpOptions);
  }
  fasttagDelete(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/FastTagDelete', request, this.httpOptions);
  }
  getFasttagInnerGridList(request: Requestmodel): Observable<Fasttagmodel> {
    return this.httpClient.post<Fasttagmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetFastTagInnerGridList', request, this.httpOptions);
  }
}
