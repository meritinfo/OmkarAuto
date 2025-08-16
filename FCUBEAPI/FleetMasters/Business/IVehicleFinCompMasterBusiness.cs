using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public interface IVehicleFinCompMasterBusiness
    {
        Task<ResponseModel> VehicleFinCompMasterSave(VehicleFinCompModel vehicleFinCompModel);
        Task<VehicleFinCompList> GetVehicleFinCompMasterList(PageRequest request);
        Task<ResponseModel> VehicleFinCompMasterChkActName(RequestModel req);
        Task<ResponseModel> VehicleFinCompMasterDelete(RequestModel req);
    }
}
