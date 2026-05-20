using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IVehiEmiBusiness
    {
        Task<VehicleInstScheduleListModel> GetVehicleInstScheduleList(ReportRequestModel request);
        Task<VehicleInstScheduleModel> GetVehicleInstScheduleInnerGridList(RequestModel request);
        Task<ResponseModel> VehicleInstScheduleMstSave(VehicleInstScheduleModel vehicleInst);
        Task<ResponseModel> VehicleInstScheduleDelete(RequestModel req);
    }
}
