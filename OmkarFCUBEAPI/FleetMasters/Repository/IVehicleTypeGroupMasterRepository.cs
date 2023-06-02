using FleetMasters.Models;

namespace FleetMasters.Repository
{
    public interface IVehicleTypeGroupMasterRepository
    {
        Task<ResponseModel> VehicleTypeGroupMasterSave (VehicleTypeGroupMasterModel vehicleTypeGroupMasterModel);
        Task<VehicleTypeGroupMasterList> GetVehicleTypeGroupMasterList(VehicleTypeGroupMasterListRequest request);
    }

}

