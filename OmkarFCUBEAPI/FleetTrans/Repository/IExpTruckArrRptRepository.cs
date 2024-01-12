using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface IExpTruckArrRptRepository
    {
        Task<ExpTruckArrRptListModel> GetExpTruckArrRPTList(ReportRequestModel request);
        Task<ResponseModel> ExcelExpTruckArrRPTList(ReportRequestModel request);
    }
}
