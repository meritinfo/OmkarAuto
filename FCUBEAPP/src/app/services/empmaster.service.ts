import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Employeemodel } from '../models/employeemodel';
import { Empmasterlistmodel } from '../models/empmasterlistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class EmpmasterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  httpformOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedEmployee = new Employeemodel();
  constructor(private httpClient: HttpClient) { }

  setEmployeeDetails(Employee: Employeemodel) { 
    this.selectedEmployee = Employee;   
  }
  getEmployeeDetails() {
    return this.selectedEmployee;
  }
  clearEmployeeDetails() {
    this.selectedEmployee = new Employeemodel();
  }  
  employeeSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpMasterSave', user, this.httpformOptions);
  }
  getEmployeeList(filter: Filtermodel): Observable<Empmasterlistmodel> {
    return this.httpClient.post<Empmasterlistmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpMasterList', filter, this.httpOptions);
  } 
  
  employeeMasterDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpMasterDelete', req, this.httpOptions);
  } 

  getDesignList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'HRMaster/GetDesignationList', null, this.httpOptions);
  } 

  getDeptList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'HRMaster/GetDepartmentList', null, this.httpOptions);
  } 

  getBankList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'HRMaster/GetBankList', null, this.httpOptions);
  } 
  getPreFixList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'HRMaster/GetPrefixList', null, this.httpOptions);
  } 
  
  getMotherTongueList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'HRMaster/GetMotherTongueList', null, this.httpOptions);
  } 

  getEmpList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'HRMaster/GetEmployeeList', null, this.httpOptions);
  }

  getMaxEmpNo(req:Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/GetMaxEmpNo', req, this.httpOptions);
  } 
}
