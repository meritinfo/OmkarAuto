using FleetMasters.Models;
using Shared.Models;


namespace FleetMasters.Business
{
    public interface IVehicleTypeMasterBusiness
    {
        Task<ResponseModel> VehicleTypeMasterSave(VehicleTypeMasterModel vehicleTypeMasterModel);
        Task<VehicleTypeMasterList> GetVehicleTypeMasterList(PageRequest request);
    }
}
