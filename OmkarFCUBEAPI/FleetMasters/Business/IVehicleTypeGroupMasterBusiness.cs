using FleetMasters.Models;
using Shared.Models;


namespace FleetMasters.Business
{
    public interface IVehicleTypeGroupMasterBusiness
    {
        Task<ResponseModel> VehicleTypeGroupMasterSave(VehicleTypeGroupMasterModel vehicleTypeGroupMasterModel);
        Task<VehicleTypeGroupMasterList> GetVehicleTypeGroupMasterList(PageRequest request);
        Task<List<DropDownListModel>> GetVehicleList();
    }
}
