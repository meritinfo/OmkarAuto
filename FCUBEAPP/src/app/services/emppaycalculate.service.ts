import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from '../models/reportmodel';
import { Constants } from '../common/constants';
import { Emppaycalcmodel } from '../models/emppaycalcmodel';
import { Empsalarymstmodel } from '../models/empsalarymstmodel';
import { Emppaycallistmodel } from '../models/emppaycallistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Empleavemodel } from 'src/app/models/empleavemodel';

@Injectable({
  providedIn: 'root'
})
export class EmppaycalculateService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedEmpPay = new Emppaycalcmodel();
  constructor(private httpClient: HttpClient) { }

  setEmpPayCalDetails(Employee: Emppaycalcmodel) { 
      this.selectedEmpPay = Employee;   
  }
  getEmpPayCalDetails() {
    return this.selectedEmpPay;
  }
  clearEmpPayCalDetails() {
    this.selectedEmpPay = new Emppaycalcmodel();
  }
  
  getEmpPayCalMstList(filter: Reportmodel): Observable<Emppaycallistmodel> {
    return this.httpClient.post<Emppaycallistmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpPayCalList', filter, this.httpOptions);
  }  
  getEmpSalaryEarnList(req: Empsalarymstmodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpSalEarnList', req, this.httpOptions);
  } 
  getEmpSalaryDedList(req: Empsalarymstmodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpSalDedList', req, this.httpOptions);
  }  
  getEmpLeaveList(req:Empleavemodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpLeaveDetails', req, this.httpOptions);
  } 
  getEmpLoanList(req:Requestmodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpLoanDetails', req, this.httpOptions);
  } 
  
  getEmpPayEarnList(req: Requestmodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpPayEarnDetails', req, this.httpOptions);
  } 
  getEmpPayDedList(req: Requestmodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpPayDedDetails', req, this.httpOptions);
  }  
  getEmpPayLeaveList(req:Requestmodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpPayLeaveDetails', req, this.httpOptions);
  } 
  getEmpPayLoanList(req:Requestmodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpPayLoanDetails', req, this.httpOptions);
  } 

  empPayCalSubmitted(user: Emppaycalcmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpPayCalSave', user, this.httpOptions);
  }
  empPayCalDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpPayCalDelete', req, this.httpOptions);
  } 
  
  getBranchEmpList(req: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'HRMaster/GetBranchEmpList', req, this.httpOptions);
  }

}
  