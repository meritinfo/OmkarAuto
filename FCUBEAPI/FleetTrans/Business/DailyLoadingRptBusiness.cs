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
    public class DailyLoadingRptBusiness : IDailyLoadingRptBusiness
    {
        readonly IDailyLoadingRptRepository dailyLoadingRptRepository;
        public DailyLoadingRptBusiness(IDailyLoadingRptRepository _dailyLoadingRptRepository)
        {
            dailyLoadingRptRepository = _dailyLoadingRptRepository;
        }
        public async Task<DailyLoadingRptListModel> GetDailyLoadingRptList(ReportRequestModel request)
        {
            return await dailyLoadingRptRepository.GetDailyLoadingRptList(request);
        }
        public async Task<ResponseModel> GetDailyLoadingRptExcel(ReportRequestModel request)
        {
            return await dailyLoadingRptRepository.GetDailyLoadingRptExcel(request);
        }
    }
}
