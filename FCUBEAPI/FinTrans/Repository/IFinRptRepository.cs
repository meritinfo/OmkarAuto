using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinTrans.Models;
using System.Data;
using Shared.Repository;
using System.Data.Common;
using System.Data.SqlClient;

namespace FinTrans.Repository
{
    public interface IFinRptRepository
    {
        Task<ResponseModel> CashBookReport(ReportRequestModel request);

        Task<LedgerRptListModel> GetBankBookRptList(ReportRequestModel request);
        Task<DataSet> bankBookReport(ReportRequestModel request);
        Task<ResponseModel> GetBankBookRptExcel(ReportRequestModel request);
        Task<ResponseModel> BankBookPrint(ReportRequestModel request);

        Task<List<DropDownListModel>> GetLedgerList();
        Task<LedgerRptListModel> GetLedgerRptList(ReportRequestModel request);
        Task<ResponseModel> GetLedgerRptExcel(ReportRequestModel request);
        Task<DataSet> ledgerReport(ReportRequestModel request);
        Task<ResponseModel> LedgerPrintPdf(RepReqModel request);
        Task<ResponseModel> LedgerMultiplePrintPdf(RepReqModel request);
        Task<ResponseModel> AnnexurePrintPdf(RepReqModel request);
        Task<ResponseModel> BrokerLedgerPrint(ReportRequestModel request);


        Task<GstSalesRegisterRptListModel> GetGstSalesRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetGstSalesRegisterRptExcel(ReportRequestModel request);


        Task<ResponseModel> GetMonthlyBookingRptExcel(ReportRequestModel requestModel);
        Task<ResponseModel> GetMonthlyLorryHireRptExcel(ReportRequestModel requestModel);
        Task<ResponseModel> GetMonthlyAdminExpRptExcel(ReportRequestModel requestModel);
        Task<List<MenuReportAccessModel>> GetReportMenuList();
    }
}
