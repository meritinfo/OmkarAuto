using DocumentFormat.OpenXml.Office2016.Excel;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public class FleetRptBusiness: IFleetRptBusiness
    {
        readonly IFleetRptRepository fleetRptRepository;
        public FleetRptBusiness(IFleetRptRepository _fleetRptRepository)
        {
            fleetRptRepository = _fleetRptRepository;
        }
        
        public async Task<DieselStmtRptListModel> GetDieselStmtRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetDieselStmtRptList(request);
        }
        public async Task<ResponseModel> GetDieselStmtRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetDieselStmtRptExcel(request);
        }
        public async Task<DocRenewalRptListModel> GetDocRenewalRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetDocRenewalRptList(request);
        }
        public async Task<ResponseModel> ExcelDocRenewalRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.ExcelDocRenewalRptList(request);
        }
        public async Task<DailyLoadingRptListModel> GetDailyLoadingRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetDailyLoadingRptList(request);
        }
        public async Task<ResponseModel> GetDailyLoadingRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetDailyLoadingRptExcel(request);
        }
        public async Task<TripStatusRptListModel> GetTripStatusRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTripStatusRptList(request);
        }
        public async Task<ResponseModel> GetTripStatusRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTripStatusRptExcel(request);
        }
        public async Task<SparesPurchaseRptListModel> GetSparesPurchaseRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetSparesPurchaseRptList(request);
        }
        public async Task<ResponseModel> GetSparesPurchaseRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetSparesPurchaseRptExcel(request);
        }
        public async Task<ExpTruckArrRptListModel> GetExpTruckArrRPTList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetExpTruckArrRPTList(request);
        }
      
        public async Task<TripPaymentsRptListModel> GetTripPaymentsRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTripPaymentsRptList(request);
        }
        public async Task<ResponseModel> ExcelTripPaymentsRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.ExcelTripPaymentsRptList(request);
        }
        public async Task<TripSummaryRptListModel> GetTripSummaryRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTripSummaryRptList(request);
        }
        public async Task<ResponseModel> ExcelTripSummaryRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.ExcelTripSummaryRptList(request);
        }
        public async Task<TripOutstandingRptListModel> GetTripOutstandingRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTripOutstandingRptList(request);
        }
        public async Task<ResponseModel> ExcelTripOutstandingRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.ExcelTripOutstandingRptList(request);
        }
        public async Task<VehicleRepairsRptListModel> GetVehicleRepairsRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetVehicleRepairsRptList(request);
        }
        public async Task<ResponseModel> GetVehicleRepairsRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetVehicleRepairsRptExcel(request);
        }
        public async Task<VehicleFrtOutstandingRptListModel> GetVehicleFrtOutstandingRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetVehicleFrtOutstandingRptList(request);
        }
       
        public async Task<ResponseModel> ExcelExpTruckArrRPTList(ReportRequestModel request)
        {
            return await fleetRptRepository.ExcelExpTruckArrRPTList(request);
        }
        public async Task<ResponseModel> GetVehicleFrtOutstandingRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetVehicleFrtOutstandingRptExcel(request);
        }
        public async Task<List<DropDownListModel>> GetTripPaymentsCreditList()
        {
            return await fleetRptRepository.GetTripPaymentsCreditList();
        }
        public async Task<TyreMgntReportList> GetTyrePurchaseRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyrePurchaseRptList(request);
        }
        public async Task<TyreMgntReportList> GetTyreStockRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyreStockRptList(request);
        }
        public async Task<ResponseModel> GetTyreStockRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyreStockRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetTyreHistoryRptList(RequestModel request)
        {
            return await fleetRptRepository.GetTyreHistoryRptList(request);
        }
        public async Task<ResponseModel> GetTyreHistoryRptExcel(RequestModel request)
        {
            return await fleetRptRepository.GetTyreHistoryRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetActiveTyreRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetActiveTyreRptList(request);
        }
        public async Task<ResponseModel> GetActiveTyreRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetActiveTyreRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetTyreActivatedRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyreActivatedRptList(request);
        }
        public async Task<ResponseModel> GetTyreActivatedRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyreActivatedRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetTyreDeActivatedRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyreDeActivatedRptList(request);
        }
        public async Task<ResponseModel> GetTyreDeActivatedRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyreDeActivatedRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetTyreReGroupIssRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyreReGroupIssRptList(request);
        }
        public async Task<ResponseModel> GetTyreReGroupIssRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyreReGroupIssRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetTyreReGroupRcvdRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyreReGroupRcvdRptList(request);
        }
        public async Task<ResponseModel> GetTyreReGroupRcvdRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyreReGroupRcvdRptExcel(request);
        }      
        public async Task<ResponseModel> GetTyrePurchaseRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetTyrePurchaseRptExcel(request);
        }
        public async Task<SparesStockRptListModel> GetSparesStockRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetSparesStockRptList(request);
        }
        public async Task<ResponseModel> GetSparesStockRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetSparesStockRptExcel(request);
        }
        public async Task<SparesHistoryRptListModel> GetSparesUsageHistoryRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetSparesUsageHistoryRptList(request);
        }
        public async Task<ResponseModel> GetSparesUsageHistoryRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetSparesUsageHistoryRptExcel(request);
        }
        public async Task<ResponseModel> GetVehicleMonthlySummRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetVehicleMonthlySummRptExcel(request);
        }
        public async Task<ResponseModel> GetVehicleMonthlyLPRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetVehicleMonthlyLPRptExcel(request);
        }
        public async Task<VehicleAdvBalReceiptMstList> GetVehicleAdvBalRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetVehicleAdvBalRptList(request);
        }
        public async Task<ResponseModel> GetVehicleAdvBalRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetVehicleAdvBalRptExcel(request);
        }
        public async Task<VehicleEngagementRptListModel> GetVehicleEngagementRptList(ReportRequestModel request)
        {
            return await fleetRptRepository.GetVehicleEngagementRptList(request);
        }
        public async Task<ResponseModel> GetVehicleEngagementRptExcel(ReportRequestModel request)
        {
            return await fleetRptRepository.GetVehicleEngagementRptExcel(request);
        }
    }
}
