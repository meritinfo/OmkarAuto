using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface IVehicleFrtOutstandingRptBusiness
    {
        Task<VehicleFrtOutstandingRptListModel> GetVehicleFrtOutstandingRptList(ReportRequestModel request);
        Task<ResponseModel> GetVehicleFrtOutstandingRptExcel(ReportRequestModel request);
    }
}
