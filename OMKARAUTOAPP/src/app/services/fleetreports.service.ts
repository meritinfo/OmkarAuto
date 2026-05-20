import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dieselstmtrptlistmodel  } from 'src/app/models/dieselstmtrptlistmodel';
import { Docrenewalrptlistmodel  } from 'src/app/models/docrenewalrptlistmodel';
import { Dailyloadingrptlistmodel  } from 'src/app/models/dailyloadingrptlistmodel';
import { Exptruckarrivallistmodel  } from 'src/app/models/exptruckarrivallistmodel';
import { Tripoutstandingrptlistmodel  } from 'src/app/models/tripoutstandingrptlistmodel';
import { Tripstatusrptlistmodel  } from 'src/app/models/tripstatusrptlistmodel';
import { Trippaymentsrptlistmodel  } from 'src/app/models/trippaymentsrptlistmodel';
import { Tripsummaryrptlistmodel  } from 'src/app/models/tripsummaryrptlistmodel';
import { Vehiclefrtoutstandingrptlistmodel  } from 'src/app/models/vehiclefrtoutstandingrptlistmodel';
import { Sparespurchaserptlistmodel  } from 'src/app/models/sparespurchaserptlistmodel';
import { Sparesstockrptlistmodel  } from 'src/app/models/sparesstockrptlistmodel';
import { Spareshistoryrptlistmodel  } from 'src/app/models/spareshistoryrptlistmodel';
import { VehicleadvbalreceiptlistModel } from '../models/vehicleadvbalreceiptlistmodel';
import { Vehicleengagementrptlistmodel } from '../models/vehicleengagementrptlistmodel';

@Injectable({
  providedIn: 'root'
})

export class FleetreportsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  constructor(private httpClient: HttpClient) { }
   
  getDieselstmtrptList(filter: Reportmodel): Observable<Dieselstmtrptlistmodel> {
    return this.httpClient.post<Dieselstmtrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStmtRptList', filter, this.httpOptions);
  }  
  getDieselstmtrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStmtRptExcel', filter, this.httpOptions);
  }  

  getDocRenewalRptList(filter: Reportmodel): Observable<Docrenewalrptlistmodel> {
    return this.httpClient.post<Docrenewalrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDocRenewalRptList', filter, this.httpOptions);
  }  
  getDocRenewalRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelDocRenewalRptList', filter, this.httpOptions);
  }    

  getDailyloadingrptList(filter: Reportmodel): Observable<Dailyloadingrptlistmodel> {
    return this.httpClient.post<Dailyloadingrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDailyLoadingRptList', filter, this.httpOptions);
  }  
  getDailyloadingrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDailyLoadingRptExcel', filter, this.httpOptions);
  }    

  getExptruckarrivalList(filter: Reportmodel): Observable<Exptruckarrivallistmodel> {
    return this.httpClient.post<Exptruckarrivallistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetExpTruckArrRPTList', filter, this.httpOptions);
  }  
  getExptruckarrivalExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelExpTruckArrRPTList', filter, this.httpOptions);
  }  
  
  getTripOutstandingRptList(filter: Reportmodel): Observable<Tripoutstandingrptlistmodel> {
    return this.httpClient.post<Tripoutstandingrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripOutstandingRptList', filter, this.httpOptions);
  }  
  getTripOutstandingRptListBrpl(filter: Reportmodel): Observable<Tripoutstandingrptlistmodel> {
    return this.httpClient.post<Tripoutstandingrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripOutstandingRptListBrpl', filter, this.httpOptions);
  } 
  getTripOutstandingRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelTripOutstandingRptList', filter, this.httpOptions);
  } 
  getTripOutstandingRptListExcelBrpl(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelTripOutstandingRptListBrpl', filter, this.httpOptions);
  }     


  getTripStatusRptList(filter: Reportmodel): Observable<Tripstatusrptlistmodel> {
    return this.httpClient.post<Tripstatusrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripStatusRptList', filter, this.httpOptions);
  }  
  getTripStatusRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelTripStatusRptList', filter, this.httpOptions);
  }   
  
  getTripPaymentsRptList(filter: Reportmodel): Observable<Trippaymentsrptlistmodel> {
    return this.httpClient.post<Trippaymentsrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripPaymentsRptList', filter, this.httpOptions);
  }  
  getTripPaymentsRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelTripPaymentsRptList', filter, this.httpOptions);
  }      

  getTripSummaryRptList(filter: Reportmodel): Observable<Tripsummaryrptlistmodel> {
    return this.httpClient.post<Tripsummaryrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripSummaryRptList', filter, this.httpOptions);
  }  
  getTripSummaryRptListExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ExcelTripSummaryRptList', filter, this.httpOptions);
  }    

  getVehiclefrtoutstandingrptList(filter: Reportmodel): Observable<Vehiclefrtoutstandingrptlistmodel> {
    return this.httpClient.post<Vehiclefrtoutstandingrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehiclefrtoutstandingRptList', filter, this.httpOptions);
  }  
  getVehiclefrtoutstandingrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehiclefrtoutstandingRptExcel', filter, this.httpOptions);
  }   
  
  getVehicleEngagementRptList(filter: Reportmodel): Observable<Vehicleengagementrptlistmodel> {
    return this.httpClient.post<Vehicleengagementrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleEngagementRptList', filter, this.httpOptions);
  }  
  getVehicleEngagementRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleEngagementRptExcel', filter, this.httpOptions);
  }   
  getVehicleLastTransDateRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleLastTransDateRptExcel', filter, this.httpOptions);
  } 
  getSparespurchaserptList(filter: Reportmodel): Observable<Sparespurchaserptlistmodel> {
    return this.httpClient.post<Sparespurchaserptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSparesPurchaseRptList', filter, this.httpOptions);
  }  
  getSparespurchaserptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSparesPurchaseRptExcel', filter, this.httpOptions);
  }    
   
  getSparesStockRptList(filter: Reportmodel): Observable<Sparesstockrptlistmodel> {
    return this.httpClient.post<Sparesstockrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSparesStockRptList', filter, this.httpOptions);
  }  
  getSparesStockRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSparesStockRptExcel', filter, this.httpOptions);
  }    
  
  getSparesUsageHistoryRptList(filter: Reportmodel): Observable<Spareshistoryrptlistmodel> {
    return this.httpClient.post<Spareshistoryrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSparesUsageHistoryRptList', filter, this.httpOptions);
  }  
  getSparesUsageHistoryRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSparesUsageHistoryRptExcel', filter, this.httpOptions);
  }   
  getVehicleMonthlySummRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleMonthlySummRptExcel', filter, this.httpOptions);
  }     
  getVehicleMonthlyLPRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleMonthlyLPRptExcel', filter, this.httpOptions);
  }  


  getVehicleAdvBalRptList(filter: Reportmodel): Observable<VehicleadvbalreceiptlistModel> {
    return this.httpClient.post<VehicleadvbalreceiptlistModel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleAdvBalRptList', filter, this.httpOptions);
  }  
  getVehicleAdvBalRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleAdvBalRptExcel', filter, this.httpOptions);
  }   
  
  getVehicleMonthlyTripsRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleMonthlyTripsRptExcel', filter, this.httpOptions);
  }   
  
  getVehiclePLStatementRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehiclePLStatementRptExcel', filter, this.httpOptions);
  }  

  getCostPerVehicleRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetCostPerVehicleRptExcel', filter, this.httpOptions);
  } 
}
