using FleetMasters.Models;
namespace FleetMasters.Business
{
    public interface IVehicleTypeMasterBusiness
    {
        Task<ResponseModel> VehicleTypeMasterSave(VehicleTypeMasterModel vehicleTypeMasterModel);
    }
}
