import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Outstandinganalrptlistmodel } from '../models/outstandinganalrptlistmodel';
import { Billregisterrptlistmodel  } from 'src/app/models/billregisterrptlistmodel';
import { Bookingregisterrptlistmodel  } from 'src/app/models/bookingregisterrptlistmodel';
import { Businesssummrptlistmodel  } from 'src/app/models/businesssummrptlistmodel';
import { Challanregisterrptlistmodel  } from 'src/app/models/challanregisterrptlistmodel';
import { Distancemasterfrtrptlistmodel  } from 'src/app/models/distancemasterfrtrptlistmodel';
import { Distancemastertriprptlistmodel  } from 'src/app/models/distancemastertriprptlistmodel';
import { Gstregisterrptlistmodel  } from 'src/app/models/gstregisterrptlistmodel';
import { Lhextrapmtreconrptlistmodel  } from 'src/app/models/lhextrapmtreconrptlistmodel';
import { Lhpayablestatusrptlistmodel  } from 'src/app/models/lhpayablestatusrptlistmodel';
import { Lhpmvariancerptlistmodel  } from 'src/app/models/lhpmvariancerptlistmodel';
import { Lrcostingrptlistmodel  } from 'src/app/models/lrcostingrptlistmodel';
import { Lrwithoutchallanrptlistmodel  } from 'src/app/models/lrwithoutchallanrptlistmodel';
import { Mrregisterrptlistmodel  } from 'src/app/models/mrregisterrptlistmodel';
import { Onaccountmrstatusrptlistmodel  } from 'src/app/models/onaccountmrstatusrptlistmodel';
import { Unbilledrptlistmodel  } from 'src/app/models/unbilledrptlistmodel';
import { Dprrptlistmodel } from 'src/app/models/dprrptlistmodel';
import { Driverlicrptlistmodel  } from 'src/app/models/driverlicrptlistmodel';
import { Detentionrptlistmodel  } from 'src/app/models/detentionrptlistmodel';
import { Mrlistmodel  } from 'src/app/models/mrlistmodel';
import { Documentallotmentlistmodel  } from 'src/app/models/documentallotmentlistmodel';
import { Billoutstandingdetailrptlistmodel  } from 'src/app/models/billoutstandingdetailrptlistmodel';
import { Repreqmodel } from '../models/repreqmodel';

@Injectable({
  providedIn: 'root'
})
export class FreightreportsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getAgeingSummRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAgeingSummRptExcel', filter, this.httpOptions);
  } 
  getAgeingSummBranchRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAgeingSummBranchRptExcel', filter, this.httpOptions);
  }
  getAgeingSummPartyRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAgeingSummPartyRptExcel', filter, this.httpOptions);
  }
  getAgeingDetailRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAgeingDetailRptExcel', filter, this.httpOptions);
  }
  getOutStandingSummRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOutStandingSummRptExcel', filter, this.httpOptions);
  }
  getOutStandingDetailRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOutstandingDetailRptExcel', filter, this.httpOptions);
  }  
  getOutStandingDetailPartyRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOutstandingDetailPartyRptExcel', filter, this.httpOptions);
  }
  getOutStandingDetailPartyRptList(filter: Reportmodel): Observable<Billoutstandingdetailrptlistmodel> {
    return this.httpClient.post<Billoutstandingdetailrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOutstandingDetailPartyRptList', filter, this.httpOptions);
  }
  getBillSubmittedSummRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillSubmittedSummRptExcel', filter, this.httpOptions);
  }
  getBillSubmittedDetailRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillSubmittedDetailRptExcel', filter, this.httpOptions);
  }
  getOutstandingAnalysisRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOutstandingAnalysisRptExcel', filter, this.httpOptions);
  }
  getOutstandingAnalysisRptList(filter: Reportmodel): Observable<Outstandinganalrptlistmodel> {
    return this.httpClient.post<Outstandinganalrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOutstandingAnalysisRptList', filter, this.httpOptions);
  }  

  getBillregisterrptList(filter: Reportmodel): Observable<Billregisterrptlistmodel> {
    return this.httpClient.post<Billregisterrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillRegisterRptList', filter, this.httpOptions);
  }  
  getBillregisterrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillRegisterRptExcel', filter, this.httpOptions);
  }   

  getBookingregisterrptList(filter: Reportmodel): Observable<Bookingregisterrptlistmodel> {
    return this.httpClient.post<Bookingregisterrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBookingRegisterRptList', filter, this.httpOptions);
  }  
  getBookingregisterrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBookingRegisterRptExcel', filter, this.httpOptions);
  }    

  getBusinesssummrptList(filter: Reportmodel): Observable<Businesssummrptlistmodel> {
    return this.httpClient.post<Businesssummrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBusinessSummRptList', filter, this.httpOptions);
  }  
  getBusinesssummrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBusinessSummRptExcel', filter, this.httpOptions);
  }  
  
  getChallanregisterrptList(filter: Reportmodel): Observable<Challanregisterrptlistmodel> {
    return this.httpClient.post<Challanregisterrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetChallanRegisterRptList', filter, this.httpOptions);
  }  
  getChallanregisterrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetChallanRegisterRptExcel', filter, this.httpOptions);
  }  
  getChallanTdsStatementrptList(filter: Reportmodel): Observable<Challanregisterrptlistmodel> {
    return this.httpClient.post<Challanregisterrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetChallanTdsStatementRptList', filter, this.httpOptions);
  } 
  getChallanTdsStatementrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetChallanTdsStatementRptExcel', filter, this.httpOptions);
  }  
  getDistancemMsterFrtRptList(filter: Reportmodel): Observable<Distancemasterfrtrptlistmodel> {
    return this.httpClient.post<Distancemasterfrtrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDistancemasterFrtRptList', filter, this.httpOptions);
  }  
  getDistanceMasterFrtRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ExcelDistanceMasterFrtRptList', filter, this.httpOptions);
  }     
  
  getDistancemMsterTripRptList(filter: Reportmodel): Observable<Distancemastertriprptlistmodel> {
    return this.httpClient.post<Distancemastertriprptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDistancemasterTripRptList', filter, this.httpOptions);
  }  
  getDistanceMasterTripRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ExcelDistanceMasterTripRptList', filter, this.httpOptions);
  }   

  getGstregisterrptList(filter: Reportmodel): Observable<Gstregisterrptlistmodel> {
    return this.httpClient.post<Gstregisterrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetGSTRegisterRptList', filter, this.httpOptions);
  }  
  getGstregisterrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetGSTRegisterRptExcel', filter, this.httpOptions);
  }  

  geLhextrapmtreconrptList(filter: Reportmodel): Observable<Lhextrapmtreconrptlistmodel> {
    return this.httpClient.post<Lhextrapmtreconrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLHExtraPmtReconRptList', filter, this.httpOptions);
  }  
  getLhextrapmtreconrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLHExtraPmtReconRptExcel', filter, this.httpOptions);
  } 

  getLhpayablestatusrptList(filter: Reportmodel): Observable<Lhpayablestatusrptlistmodel> {
    return this.httpClient.post<Lhpayablestatusrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLhPayableStatusRptList', filter, this.httpOptions);
  }  
  getLhpayablestatusrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLhPayableStatusRptExcel', filter, this.httpOptions);
  }   

  getLhpmvariancerptList(filter: Reportmodel): Observable<Lhpmvariancerptlistmodel> {
    return this.httpClient.post<Lhpmvariancerptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLHPMVarianceRptList', filter, this.httpOptions);
  }  
  getLhpmvariancerptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLHPMVarianceRptExcel', filter, this.httpOptions);
  }    

  getLrcostingrptList(filter: Reportmodel): Observable<Lrcostingrptlistmodel> {
    return this.httpClient.post<Lrcostingrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLRCostingRptList', filter, this.httpOptions);
  }  
  getLrcostingrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLRCostingRptExcel', filter, this.httpOptions);
  }  
    getLRwiseCostingLlpRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLRwiseCostingLlpRptExcel', filter, this.httpOptions);
  }  

  getLrwithoutchallanrptList(filter: Reportmodel): Observable<Lrwithoutchallanrptlistmodel> {
    return this.httpClient.post<Lrwithoutchallanrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLRWithOutChallanRptList', filter, this.httpOptions);
  }  
  getLrwithoutchallanrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLRWithOutChallanRptExcel', filter, this.httpOptions);
  } 
  getLrRealisationStatusExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLrRealisationStatusExcel', filter, this.httpOptions);
  } 
  getMrregisterrptList(filter: Reportmodel): Observable<Mrregisterrptlistmodel> {
    return this.httpClient.post<Mrregisterrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetMRRegisterRptList', filter, this.httpOptions);
  }  
  getMrregisterrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetMRRegisterRptExcel', filter, this.httpOptions);
  }   

  getOnaccountmrstatusrptList(filter: Reportmodel): Observable<Onaccountmrstatusrptlistmodel> {
    return this.httpClient.post<Onaccountmrstatusrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOnAccountMRStatusRptList', filter, this.httpOptions);
  }  
  getOnaccountmrstatusrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetOnAccountMRStatusRptExcel', filter, this.httpOptions);
  }    
  
  getUnbilledrptList(filter: Repreqmodel): Observable<Unbilledrptlistmodel> {
    return this.httpClient.post<Unbilledrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetUnBilledRptList', filter, this.httpOptions);
  }  
  getUnbilledrptExcel(filter: Repreqmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetUnBilledRptExcel', filter, this.httpOptions);
  }    

  getPendingDelvAckRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetPendingDelvAckRptExcel', filter, this.httpOptions);
  }  
  
  getDPRRptList(filter: Reportmodel): Observable<Dprrptlistmodel> {
    return this.httpClient.post<Dprrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDPRRptList', filter, this.httpOptions);
  }  
  getDPRRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDPRRptExcel', filter, this.httpOptions);
  }   
  
  getDriverLicRptList(filter: Reportmodel): Observable<Driverlicrptlistmodel> {
    return this.httpClient.post<Driverlicrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDriverLicRPTList', filter, this.httpOptions);
  }  
  getDriverLicRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ExcelDriverLicRptList', filter, this.httpOptions);
  }   
  
  getLHPaymentSummRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetLHPaymentSummRptExcel', filter, this.httpOptions);
  }   

  getDetentionRptList(filter: Reportmodel): Observable<Detentionrptlistmodel> {
    return this.httpClient.post<Detentionrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDetentionRptList', filter, this.httpOptions);
  }  
  getDetentionRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDetentionRptExcel', filter, this.httpOptions);
  }   
  getDeductionRptList(filter: Reportmodel): Observable<Mrlistmodel> {
    return this.httpClient.post<Mrlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDeductionRptList', filter, this.httpOptions);
  }  
  getDeductionRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDeductionRptExcel', filter, this.httpOptions);
  } 

  getMissingDocRptList(filter: Reportmodel): Observable<Documentallotmentlistmodel> {
    return this.httpClient.post<Documentallotmentlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetMissingDocRptList', filter, this.httpOptions);
  }  
  getMissingDocRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetMissingDocRptExcel', filter, this.httpOptions);
  }   
  getBillGstRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillGstRptExcel', filter, this.httpOptions);
  }   
  getDeliveryDisputeRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetDeliveryDisputeRptExcel', filter, this.httpOptions);
  }    
  getPartyMISRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetPartyMISRptExcel', filter, this.httpOptions);
  }   
  getBillInterestLossRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillInterestLossRptExcel', filter, this.httpOptions);
  }  
    
  getCountOfDocEnteredRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetCountOfDocEnteredRptExcel', filter, this.httpOptions);
  }   
}
