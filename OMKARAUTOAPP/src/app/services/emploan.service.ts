import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Emploanmodel } from '../models/emploanmodel';
import { Emploanlistmodel } from '../models/emploanlistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class EmploanService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedEmpLoan = new Emploanmodel();
  constructor(private httpClient: HttpClient) { }

  setEmpLoanDetails(EmpLoan: Emploanmodel) { 
      this.selectedEmpLoan = EmpLoan;   
  }
  getEmpLoanDetails() {
    return this.selectedEmpLoan;
  }
  clearEmpLoanDetails() {
    this.selectedEmpLoan = new Emploanmodel();
  }

  
  getEmpLoanList(filter: Filtermodel): Observable<Emploanlistmodel> {
    return this.httpClient.post<Emploanlistmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpLoanList', filter, this.httpOptions);
  } 

  empLoanSubmitted(user: Emploanmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpLoanSave', user, this.httpOptions);
  }
  
  empLoanDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpLoanDelete', req, this.httpOptions);
  } 

  getEmpLoanRepayList(filter: Filtermodel): Observable<Emploanlistmodel> {
    return this.httpClient.post<Emploanlistmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpLoanRepayList', filter, this.httpOptions);
  } 

  empLoanRepaySubmitted(user: Emploanmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpLoanRepaySave', user, this.httpOptions);
  }
  
  empLoanRepayDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpLoanRepayDelete', req, this.httpOptions);
  } 

  getLoanList(req: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'HRMaster/GetLoanList', req, this.httpOptions);
  }

  getLoanAmountDetails(req: Requestmodel): Observable<Dropdownmodel> {
    return this.httpClient.post<Dropdownmodel>(Constants.API_ENDPOINT + 'HRMaster/GetLoanAmountDetails', req, this.httpOptions);
  }

}
