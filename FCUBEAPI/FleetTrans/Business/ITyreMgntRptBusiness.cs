using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface ITyreMgntRptBusiness
    {
        Task<TyreMgntReportList> GetTyrePurchaseRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyrePurchaseRptExcel(ReportRequestModel request);
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
    }


}
