import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Pltransfermodel } from 'src/app/models/pltransfermodel';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})

export class PltransferService 
{
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  constructor(private httpClient: HttpClient) { }
  selectPltransfermodel = new Pltransfermodel();

  getPLTransferList(request: Requestmodel): Observable<Pltransfermodel> {
    return this.httpClient.post<Pltransfermodel>(Constants.API_ENDPOINT + 'FinTrans/PlTransferList', request, this.httpOptions);
  }
   plTransferSave(doc: Pltransfermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/PLTransferSave', doc, this.httpOptions);
  }
}
