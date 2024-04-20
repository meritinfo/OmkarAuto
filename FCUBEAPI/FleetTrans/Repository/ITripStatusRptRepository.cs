using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface ITripStatusRptRepository
    {
        Task<TripStatusRptListModel> GetTripStatusRptList(ReportRequestModel request);
        Task<ResponseModel> GetTripStatusRptExcel(ReportRequestModel request);
    }
}
