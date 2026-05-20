
using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Repository
{
    public interface IVehicleTypeMasterRepository
    {
        Task<ResponseModel> VehicleTypeMasterSave (VehicleTypeMasterModel vehicleTypeMasterModel);
        Task<VehicleTypeMasterList> GetVehicleTypeMasterList(PageRequest request);
        Task<ResponseModel> VehicleTypeMasterDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateVehicleDesc(RequestModel requestModel);
        Task<ResponseModel> GetVehiCapacity(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateAlias(RequestModel requestModel);
        Task<VehicleTypeMasterModel> GetVehicleTypeInnerGridList(RequestModel request);
    }
}

