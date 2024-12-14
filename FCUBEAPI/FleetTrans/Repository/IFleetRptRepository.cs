using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface IFleetRptRepository
    {
        Task<DieselStmtRptListModel> GetDieselStmtRptList(ReportRequestModel request);
        Task<ResponseModel> GetDieselStmtRptExcel(ReportRequestModel request);
        Task<DocRenewalRptListModel> GetDocRenewalRptList(ReportRequestModel request);
        Task<ResponseModel> ExcelDocRenewalRptList(ReportRequestModel request);
        Task<ExpTruckArrRptListModel> GetExpTruckArrRPTList(ReportRequestModel request);
        Task<DailyLoadingRptListModel> GetDailyLoadingRptList(ReportRequestModel request);
        Task<ResponseModel> GetDailyLoadingRptExcel(ReportRequestModel request);
        Task<TripStatusRptListModel> GetTripStatusRptList(ReportRequestModel request);
        Task<ResponseModel> GetTripStatusRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetVehicleFrtOutstandingRptExcel(ReportRequestModel request);
        Task<VehicleFrtOutstandingRptListModel> GetVehicleFrtOutstandingRptList(ReportRequestModel request);
        Task<TripOutstandingRptListModel> GetTripOutstandingRptList(ReportRequestModel request);
        Task<ResponseModel> ExcelTripOutstandingRptList(ReportRequestModel request);

        Task<List<DropDownListModel>> GetTripPaymentsCreditList();

        Task<SparesPurchaseRptListModel> GetSparesPurchaseRptList(ReportRequestModel request);
        Task<ResponseModel> GetSparesPurchaseRptExcel(ReportRequestModel request);
        Task<ResponseModel> ExcelTripPaymentsRptList(ReportRequestModel request);
        Task<TripPaymentsRptListModel> GetTripPaymentsRptList(ReportRequestModel request);
        Task<TripSummaryRptListModel> GetTripSummaryRptList(ReportRequestModel request);
        Task<ResponseModel> ExcelTripSummaryRptList(ReportRequestModel request);
        Task<ResponseModel> ExcelExpTruckArrRPTList(ReportRequestModel request);



        Task<VehicleRepairsRptListModel> GetVehicleRepairsRptList(ReportRequestModel request);
        Task<ResponseModel> GetVehicleRepairsRptExcel(ReportRequestModel request);
        Task<TyreMgntReportList> GetTyrePurchaseRptList(ReportRequestModel request);
        Task<TyreMgntReportList> GetTyreStockRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyreStockRptExcel(ReportRequestModel request);
        Task<TyreMgntReportList> GetTyreHistoryRptList(RequestModel request);
        Task<ResponseModel> GetTyreHistoryRptExcel(RequestModel request);
        Task<TyreMgntReportList> GetActiveTyreRptList(ReportRequestModel request);
        Task<ResponseModel> GetActiveTyreRptExcel(ReportRequestModel request);
        Task<TyreMgntReportList> GetTyreActivatedRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyreActivatedRptExcel(ReportRequestModel request);
        Task<TyreMgntReportList> GetTyreDeActivatedRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyreDeActivatedRptExcel(ReportRequestModel request);
        Task<TyreMgntReportList> GetTyreReGroupIssRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyreReGroupIssRptExcel(ReportRequestModel request);
        Task<TyreMgntReportList> GetTyreReGroupRcvdRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyreReGroupRcvdRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetTyrePurchaseRptExcel(ReportRequestModel request);





    }





}
