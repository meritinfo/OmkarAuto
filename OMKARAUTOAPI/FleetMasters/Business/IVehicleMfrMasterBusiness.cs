using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public interface IVehicleMfrMasterBusiness
    {
        Task<ResponseModel> VehicleMfrMasterSave(VehicleMfrMasterModel vehicleMfrMasterModel);
        Task<VehicleMfrMasterList> GetVehicleMfrMasterList(PageRequest request);
        Task<ResponseModel> VehicleMfrMasterChkActName(RequestModel req);
        Task<ResponseModel> VehicleMfrMasterDelete(RequestModel req);
    }
}
