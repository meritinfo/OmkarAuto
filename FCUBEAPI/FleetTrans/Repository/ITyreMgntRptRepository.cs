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
    }
}
