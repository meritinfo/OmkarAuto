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
    public class TripOutstandingRptBusiness: ITripOutstandingRptBusiness
    {
        readonly ITripOutstandingRptRepository tripOutstandingRptRepository;
        public TripOutstandingRptBusiness(ITripOutstandingRptRepository _tripOutstandingRptRepository)
        {
            tripOutstandingRptRepository = _tripOutstandingRptRepository;
        }
        public async Task<TripOutstandingRptListModel> GetTripOutstandingRptList(ReportRequestModel request)
        {
            return await tripOutstandingRptRepository.GetTripOutstandingRptList(request);
        }
        public async Task<ResponseModel> ExcelTripOutstandingRptList(ReportRequestModel request)
        {
            return await tripOutstandingRptRepository.ExcelTripOutstandingRptList(request);
        }
    }
}
