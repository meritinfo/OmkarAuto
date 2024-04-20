using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface IDailyLoadingRptRepository
    {
        Task<DailyLoadingRptListModel> GetDailyLoadingRptList(ReportRequestModel request);
        Task<ResponseModel> GetDailyLoadingRptExcel(ReportRequestModel request);
    }
}
