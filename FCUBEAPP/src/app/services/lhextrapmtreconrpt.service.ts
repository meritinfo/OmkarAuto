import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Lhextrapmtreconrptlistmodel  } from 'src/app/models/lhextrapmtreconrptlistmodel';
import { Lhextrapmtreconrptmodel } from 'src/app/models/lhextrapmtreconrptmodel';

@Injectable({
  providedIn: 'root'
})
export class LhextrapmtreconrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  geLhextrapmtreconrptList(filter: Reportmodel): Observable<Lhextrapmtreconrptlistmodel> {
    return this.httpClient.post<Lhextrapmtreconrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLHExtraPmtReconRptList', filter, this.httpOptions);
  }  
  getLhextrapmtreconrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLHExtraPmtReconRptExcel', filter, this.httpOptions);
  }    

}

