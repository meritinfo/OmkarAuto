using FleetMasters.Models;
namespace FleetMasters.Business
{
    public interface IVehicleFltMasterBusiness
    {
        Task<ResponseModel> VehicleFltMasterSave(VehicleFltMasterModel vehicleFltMasterModel);
    }
}
