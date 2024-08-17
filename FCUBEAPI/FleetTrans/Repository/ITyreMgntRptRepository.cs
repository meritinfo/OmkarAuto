using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface ITyreMgntRptRepository
    {
        Task<TyrePurchaseMasterList> GetTyrePurchaseRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyrePurchaseRptExcel(ReportRequestModel request);
        Task<TyreMasterList> GetTyreStockRptList(ReportRequestModel request);
        Task<ResponseModel> GetTyreStockRptExcel(ReportRequestModel request);
        Task<TyreMasterList> GetTyreHistoryRptList(RequestModel request);
        Task<ResponseModel> GetTyreHistoryRptExcel(RequestModel request);
        Task<TyreMasterList> GetActiveTyreRptList(ReportRequestModel request);
        Task<ResponseModel> GetActiveTyreRptExcel(ReportRequestModel request);
    }
}
