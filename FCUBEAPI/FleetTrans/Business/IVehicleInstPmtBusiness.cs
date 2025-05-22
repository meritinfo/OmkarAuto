using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface IVehicleInstPmtBusiness
    {
        Task<ResponseModel> VehicleInstPmtSave(VehicleInstPmtModel vehicleInstPmtModel);
        Task<VehicleInstPmtList> GetVehicleInstPmtMasterList(ReportRequestModel request);
        Task<ResponseModel> VehicleInstPmtMasterDelete(RequestModel requestModel);
        Task<ResponseModel> checkVehicleLoanType(RequestModel requestModel);
    }
}
