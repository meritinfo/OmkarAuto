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
    public class TripSummaryRptBusiness: ITripSummaryRptBusiness
    {
        readonly ITripSummaryRptRepository tripSummaryRptRepository;
        public TripSummaryRptBusiness(ITripSummaryRptRepository _tripSummaryRptRepository)
        {
            tripSummaryRptRepository = _tripSummaryRptRepository;
        }
        public async Task<TripSummaryRptListModel> GetTripSummaryRptList(ReportRequestModel request)
        {
            return await tripSummaryRptRepository.GetTripSummaryRptList(request);
        }
        public async Task<ResponseModel> ExcelTripSummaryRptList(ReportRequestModel request)
        {
            return await tripSummaryRptRepository.ExcelTripSummaryRptList(request);
        }
    }
}
