using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface IVehicleFrtOutstandingRptRepository
    {
        Task<VehicleFrtOutstandingRptListModel> GetVehicleFrtOutstandingRptList(ReportRequestModel request);
        Task<ResponseModel> GetVehicleFrtOutstandingRptExcel(ReportRequestModel request);
    }
}
