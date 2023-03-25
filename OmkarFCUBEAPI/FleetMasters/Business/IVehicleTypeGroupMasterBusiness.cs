using FleetMasters.Models;
namespace FleetMasters.Business
{
    public interface IVehicleTypeGroupMasterBusiness
    {
        Task<ResponseModel> VehicleTypeGroupMasterSave(VehicleTypeGroupMasterModel vehicleTypeGroupMasterModel);
    }
}
