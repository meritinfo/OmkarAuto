import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Docrenewalmodel } from '../models/docrenewalmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Tyresalesmastermodel } from 'src/app/models/tyresalesmastermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Responsemodel } from '../models/responsemodel';
import { Dashboardmodel } from '../models/dashboardmodel';
import { Usermodel } from '../models/usermodel';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }

  getBranchList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetBranchList', null, this.httpOptions);
  }
  getBenList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetBeneficiaryList', null, this.httpOptions);
  }
  getPartyGstLocationList(req: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetBillPartyGstLocationList', req, this.httpOptions);
  }
  getDeptList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetDeptList', null, this.httpOptions);
  }
  getScopeBranchList(req:Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Login/GetScopeBranchList', req, this.httpOptions);
  }  
  getCnNoLength(): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetCnNoLength', null, this.httpOptions);
  }  
  getTyreBrandList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreBrandList', null, this.httpOptions);
  }
  getSparesBrandList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetSparesBrandList', null, this.httpOptions);
  }
  chkMandatoryRequired(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/ChkMandatoryRequired', req, this.httpOptions);
  }
  getSparesList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetSparesList', null, this.httpOptions);
  }
  getMaintanenceList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetMaintanenceList', null, this.httpOptions);
  }
  getModelList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetModelList', null, this.httpOptions);
  }
  getVendorList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetVendorList', null, this.httpOptions);
  }
  getCustomerList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetCustomerList', null, this.httpOptions);
  }  
  getCustomerDetails(req: Requestmodel): Observable<Tyresalesmastermodel> {
    return this.httpClient.post<Tyresalesmastermodel>(Constants.API_ENDPOINT + 'FleetTrans/GetCustomerDetailList', req, this.httpOptions);
  }
  getYearList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Login/GetYearList', null, this.httpOptions);
  }
  getRateList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetRateList', null, this.httpOptions);
  }
  getGstByList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetGstByList', null, this.httpOptions);
  }
  getModuleList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Admin/GetModuleList', null, this.httpOptions);
  }
  getVehicleTypeList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicalTypeList', null, this.httpOptions);
  } 
  getVehicleTypeGroupList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicalTypeGroupList', null, this.httpOptions);
  } 
  getFltGroupList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetFltGroupList', null, this.httpOptions);
  } 
  getLoanLedgerAccountList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetLoanLedgerAccountList', null, this.httpOptions);
  } 
  getFinCompName(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetFinCompName', null, this.httpOptions);
  } 
  getVehicleTypeFltGroupList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicalTypeFltGroupList', null, this.httpOptions);
  }  
  getHrTypeList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Admin/GetHrTypeList', null, this.httpOptions);
  }
  getRoleTypeList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Admin/GetRoleTypeList', null, this.httpOptions);
  }
  getUserRights(req:Requestmodel): Observable<Usermodel> {
    return this.httpClient.post<Usermodel>(Constants.API_ENDPOINT + 'Admin/GetUserRights', req, this.httpOptions);
  }
  
  getStateList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetStateList', null, this.httpOptions);
  }
  GetCneeCnorList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetCneeCnorList', null, this.httpOptions);
  }
  getClassList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetClassList', null, this.httpOptions);
  } 
  getAccountList(req: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetCashBankAccountList', req, this.httpOptions);
  }
  getContentList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetContentList', null, this.httpOptions);
  } 
  getEmpList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetEmpList', null, this.httpOptions);
  }  
  getBenBankList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetBenBankList', null, this.httpOptions);
  }  
  getBrokerList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetBrokerList', null, this.httpOptions);
  }  
  getBrokerListNew(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetBrokerListNew', null, this.httpOptions);
  }  
  getLocationList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetLocationList', null, this.httpOptions);
  }  
  getPartyList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetPartyList', null, this.httpOptions);
  }
  getPartyMisList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetPartyMisList', null, this.httpOptions);
  }
  getVehicleNoList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetVehicleNoList', null, this.httpOptions);
  }
  getVehicleIdList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetVehicleIdList', null, this.httpOptions);
  }
  getTripPaymentsCreditList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetTripPaymentsCreditList', null, this.httpOptions);
  }
  getlrSeriesList(req:Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetLRSeries', req, this.httpOptions);
  }
  getAddCostRecList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetAddCostRecList', null, this.httpOptions);
  }   
  getcostCodeList(req:Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetcostCodeList', req, this.httpOptions);
  }
  getlrSeriesForBillList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetLRSeriesForBill', null, this.httpOptions);
  }
  getDocRefNoList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetDocRenewalList', null, this.httpOptions);
  }
  getBillingPartyList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetPartyList', null, this.httpOptions);
  }
  getBillTypesList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetBillTypesList', null, this.httpOptions);
  }
  getPartyGroupList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetPartyGroupList', null, this.httpOptions);
  }
  getDriverList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetDriverList', null, this.httpOptions);
  }
  getExpList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetExpList', null, this.httpOptions);
  }
  getExpTypeList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetExpTypeList', null, this.httpOptions);
  }
  getCardledgerAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetCardledgerAcList', null, this.httpOptions);
  }
  getSubledgerAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetSubledgerAcList', null, this.httpOptions);
  }
  getValidateList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetValidateList', null, this.httpOptions);
  }
  // getTableField(payload: any): Observable<any> {
  //   return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FinanceMasters/GetTableField', payload, this.httpOptions);
  // }
  getTableField(request: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetTableField', request, this.httpOptions);
  }
  getBankAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetBankAcList2', null, this.httpOptions);
  }
  getBankDebitAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetBankDebitAcList', null, this.httpOptions);
  }
  getCreditAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetCreditAcList', null, this.httpOptions);
  }
  GetCrAcListForCustWizard(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetCrAcListForCustWizard', null, this.httpOptions);
  }
  GetFinAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetFinAcList', null, this.httpOptions);
  }
  getProductList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetProductGroupList', null, this.httpOptions);
  }
  billDetails(req: Requestmodel): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Admin/GetEWayBillDetails', req, this.httpOptions);
  }
  
  getCnorCneeDetails(req: Requestmodel): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetCnorCneeDetails', req, this.httpOptions);
  }
  checkEwaybillExits(req: Requestmodel): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/CheckEwaybillExits', req, this.httpOptions);
  }
  checkLrExits(req: Requestmodel): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/CheckLrExits', req, this.httpOptions);
  }
  getOpeningBal(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetOpeningBal', payload, this.httpOptions);
  }
  getDslMileage(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetDslMileage', payload, this.httpOptions);
  }
  getDriverDetail(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetDriverDetail', payload, this.httpOptions);
  }
  getBhattaRate(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetBhattaRate', payload, this.httpOptions);
  }
  getCreditAcList2(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetCreditAcList2', payload, this.httpOptions);
  }   
  getCompanyDetail(): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Login/GetCompanyDetail',null, this.httpOptions);
  }
  getScheduleDetails(): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Login/GetScheduleDetails',null, this.httpOptions);
  }
  getUserDetails(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetUserDetails', payload, this.httpOptions);
  }
  getCompanyDetails(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FreightMasters/GetCompanyDetail', payload, this.httpOptions);
  }
  getCustWizardDetails(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FinTrans/GetCustWizardDetail', payload, this.httpOptions);
  }

  getGcSeries(req: Requestmodel):  Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetGcSeries', req, this.httpOptions);
  }
  getBillSeries(req: Requestmodel):  Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetBillSeries', req, this.httpOptions);
  }
  getBillSubmitSeries(req: Requestmodel):  Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetBillSubmitSeries', req, this.httpOptions);
  }
  checkDuplicateLr(req: Requestmodel): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/CheckDuplicateLr', req, this.httpOptions);
  }
  checkDuplicateCardNo(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetMasters/CheckDuplicateCardNo', payload, this.httpOptions);
  }
  checkPassword(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Admin/CheckPassword', payload, this.httpOptions);
  }
  checkDuplicateCardCode(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetMasters/CheckDuplicateCardCode', payload, this.httpOptions);
  }
  getPaymentCreditAcList(request: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetPaymentCreditAcList', request, this.httpOptions);
  }  
  getTyrePositionList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetTyrePositionList', null, this.httpOptions);
  }  
  getVendorDetails(filter: Requestmodel): Observable<Requestmodel> {
    return this.httpClient.post<Requestmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVendorDetails', filter, this.httpOptions);
  } 
  getDocRenewalDetails(): Observable<Docrenewalmodel[]> {
    return this.httpClient.post<Docrenewalmodel[]>(Constants.API_ENDPOINT + 'Admin/GetDocRenewalDetails', null, this.httpOptions);
  }
  getNccDashBoardDetails(req: Requestmodel): Observable<Dashboardmodel> {
    return this.httpClient.post<Dashboardmodel>(Constants.API_ENDPOINT + 'Admin/GetDashboardNCC', req, this.httpOptions);
  }
  getVehiCapacity(filter: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/GetVehiCapacity', filter, this.httpOptions);
  } 
  getRangeList(filter: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetRangeList', filter, this.httpOptions);
  }  
  getSeriesllpList(filter: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetSeriesllpList', filter, this.httpOptions);
  }  
  getFreightList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetFreightList', null, this.httpOptions);
  }


  formatDate(date: string) {
    if(date == ''||date == null){
      return '';
    }
    var dateParts =[''];
    if(date.includes("/")){   
     dateParts = date.split(" ")[0].split("/");
    }
    else{  
     dateParts = date.split(" ")[0].split("-");
    }
    var dateObject = new Date(dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]);
    const d = new Date(dateObject);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  getCurrentFiscalYear(date: string) {
    var dates = {
      'sDate': new Date(),
      'eDate': new Date()
    };
    var docDate = new Date(date);
    var month = docDate.getMonth()+1;
    if (month > 3) {
      dates.sDate = new Date(docDate.getFullYear(), 3, 1);
      dates.eDate = new Date(dates.sDate.getFullYear() + 1, dates.sDate.getMonth() - 1, 31);
    }
    else {
      dates.sDate = new Date(docDate.getFullYear() - 1, 3, 1);
      dates.eDate = new Date(docDate.getFullYear(), dates.sDate.getMonth() - 1, 31);
    }
    return dates;
  }
}
