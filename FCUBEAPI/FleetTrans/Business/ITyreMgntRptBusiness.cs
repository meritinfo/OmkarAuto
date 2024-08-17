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
        Task<TyrePurchaseMasterList> GetTyrePurchaseRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyrePurchaseRptExcel(ReportRequestModel request);
        Task<TyreMasterList> GetTyreStockRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyreStockRptExcel(ReportRequestModel request);
        Task<TyreMasterList> GetTyreHistoryRptList(RequestModel request);
        Task<ResponseModel> GetTyreHistoryRptExcel(RequestModel request);
        Task<TyreMasterList> GetActiveTyreRptList(ReportRequestModel request);
        Task<ResponseModel> GetActiveTyreRptExcel(ReportRequestModel request);
        Task<TyreMasterList> GetTyreActivatedRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyreActivatedRptExcel(ReportRequestModel request);
        Task<TyreMasterList> GetTyreDeActivatedRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyreDeActivatedRptExcel(ReportRequestModel request);
        Task<TyreMasterList> GetTyreReGroupIssRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyreReGroupIssRptExcel(ReportRequestModel request);
        Task<TyreMasterList> GetTyreReGroupRcvdRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyreReGroupRcvdRptExcel(ReportRequestModel request);
    }


}
