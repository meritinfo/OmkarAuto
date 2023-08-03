using FleetMasters.Models;
namespace FleetMasters.Business
{
    public interface IVehicleTypeGroupMasterBusiness
    {
        Task<ResponseModel> VehicleTypeGroupMasterSave(VehicleTypeGroupMasterModel vehicleTypeGroupMasterModel);
        Task<VehicleTypeGroupMasterList> GetVehicleTypeGroupMasterList(VehicleTypeGroupMasterListRequest request);
        Task<List<VehicleListModel>> GetVehicleList();
    }
}
