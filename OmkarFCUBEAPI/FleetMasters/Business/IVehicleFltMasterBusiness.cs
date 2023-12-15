using FleetMasters.Models;
using Shared.Models;


namespace FleetMasters.Business
{
    public interface IVehicleFltMasterBusiness
    {
        Task<ResponseModel> VehicleFltMasterSave(VehicleFltMasterModel vehicleFltMasterModel);
        Task<VehicleFltMasterList> GetVehicleFltMasterList(PageRequest request);
        Task<ResponseModel> VehicalMasterDetailsDelete(Request req);
        Task<List<DropDownListModel>> GetVehicalTypeList();
        Task<List<DropDownListModel>> GetVehicalLedgerAccountList();
        Task<List<DropDownListModel>> GetVehicalAssetAccountList();
        Task<List<DropDownListModel>> GetVehicalMfrList();
        Task<ResponseModel> ChkVehicalNoExist(Request req);
        Task<VehicleFltMasterModel> GetVehicleFltInnerGridList(Request req);
    }
}
