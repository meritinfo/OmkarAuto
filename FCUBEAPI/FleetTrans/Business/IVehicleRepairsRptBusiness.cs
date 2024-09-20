using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface IVehicleRepairsRptBusiness
    {
        Task<VehicleRepairsRptListModel> GetVehicleRepairsRptList(ReportRequestModel request);
        Task<ResponseModel> GetVehicleRepairsRptExcel(ReportRequestModel request);
    }
}
