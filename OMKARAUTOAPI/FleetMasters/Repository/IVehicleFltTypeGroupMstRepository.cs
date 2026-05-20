using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public interface IVehicleFltTypeGroupMstRepository
    {
        Task<ResponseModel> CheckDuplicateVehTypeName(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateVehTypeCode(RequestModel requestModel);
        Task<ResponseModel> VehicleFltTypeMstSave(VehicleFltTypeGroupMstModel vehicleFltTypeGroupMstModel);


        Task<VehicleFltTypeGroupMstList> GetVehicleFltGroupMstList(ReportRequestModel request);
        Task<ResponseModel> VehicleFltTypeGroupDelete(RequestModel requestModel);
    }
}
