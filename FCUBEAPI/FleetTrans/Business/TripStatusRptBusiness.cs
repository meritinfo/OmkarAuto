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
    public class TripStatusRptBusiness: ITripStatusRptBusiness
    {
        readonly ITripStatusRptRepository tripStatusRptRepository;
        public TripStatusRptBusiness(ITripStatusRptRepository _tripStatusRptRepository)
        {
            tripStatusRptRepository = _tripStatusRptRepository;
        }
        public async Task<TripStatusRptListModel> GetTripStatusRptList(ReportRequestModel request)
        {
            return await tripStatusRptRepository.GetTripStatusRptList(request);
        }
        public async Task<ResponseModel> GetTripStatusRptExcel(ReportRequestModel request)
        {
            return await tripStatusRptRepository.GetTripStatusRptExcel(request);
        }
    }
}
