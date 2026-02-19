using Shared.Models;
using FinTrans.Models;

using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Business
{
    public interface IFinRptBusiness
    {
        Task<ResponseModel> CashBookReport(ReportRequestModel request);

        Task<List<DropDownListModel>> GetLedgerList();
        Task<LedgerRptListModel> GetLedgerRptList(ReportRequestModel request);
        Task<ResponseModel> GetLedgerRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetMultipleLedgerRptExcel(RepReqModel request);
        Task<ResponseModel> GetAnnexureRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetLedgerRptPdf(ReportRequestModel request);
        Task<ResponseModel> GetMultipleLedgerRptPdf(RepReqModel request);
        Task<ResponseModel> GetAnnexureRptPdf(ReportRequestModel request);
        Task<ResponseModel> BrokerLedgerPrint(ReportRequestModel request);


        Task<LedgerRptListModel> GetBankBookRptList(ReportRequestModel request);
        Task<ResponseModel> GetBankBookRptPdf(ReportRequestModel request);
        Task<ResponseModel> GetBankBookRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetBRSRptExcel(ReportRequestModel request);
        Task<ResponseModel> BankBookPrint(ReportRequestModel request);
        Task<ResponseModel> GetMonthlyPerformanceExcel(ReportRequestModel request);

        Task<GstSalesRegisterRptListModel> GetGstSalesRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetGstSalesRegisterRptExcel(ReportRequestModel request);


        Task<ResponseModel> GetMonthlyBookingRptExcel(ReportRequestModel requestModel);
        Task<ResponseModel> GetMonthlyLorryHireRptExcel(ReportRequestModel requestModel);
        Task<ResponseModel> GetMonthlyAdminExpRptExcel(ReportRequestModel requestModel);
        Task<List<MenuReportAccessModel>> GetReportMenuList();
        Task<ResponseModel> GetBalanceAsPerBooks(ReportRequestModel request);
    }
}
