
using FleetMasters.Models;

namespace FleetMasters.Repository
{
    public interface IVehicleTypeMasterRepository
    {
        Task<ResponseModel> VehicleTypeMasterSave (VehicleTypeMasterModel vehicleTypeMasterModel);
    }
}
