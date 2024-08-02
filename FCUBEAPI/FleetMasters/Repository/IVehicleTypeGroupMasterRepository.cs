using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Repository
{
    public interface IVehicleTypeGroupMasterRepository
    {
        Task<ResponseModel> VehicleTypeGroupMasterSave (VehicleTypeGroupMasterModel vehicleTypeGroupMasterModel);
        Task<VehicleTypeGroupMasterList> GetVehicleTypeGroupMasterList(PageRequest request);
       
    }

}

