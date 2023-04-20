
using FleetMasters.Models;

namespace FleetMasters.Repository
{
    public interface IVehicleFltMasterRepository
    {
        Task<ResponseModel> VehicleFltMasterSave(VehicleFltMasterModel vehicleFltMasterModel);
    }
}
