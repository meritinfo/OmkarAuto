using FleetMasters.Models;
using Shared.Models;


namespace FleetMasters.Business
{
    public interface IVehicleFltMasterBusiness
    {
        Task<ResponseModel> VehicleFltMasterSave(VehicleFltMasterModel vehicleFltMasterModel);
        Task<VehicleFltMasterList> GetVehicleFltMasterList(PageRequest request);
        Task<ResponseModel> VehicalMasterDetailsDelete(RequestModel req);
        Task<List<DropDownListModel>> GetVehicalTypeList();
        Task<List<DropDownListModel>> GetFltGroupList();
        Task<List<DropDownListModel>> GetVehicalLedgerAccountList();
        Task<List<DropDownListModel>> GetVehicalAssetAccountList();
        Task<List<DropDownListModel>> GetVehicalMfrList();
        Task<ResponseModel> ChkVehicalNoExist(RequestModel req);
        Task<VehicleFltMasterModel> GetVehicleFltInnerGridList(RequestModel req);
        Task<List<DropDownListModel>> GetVehicalTypeGroupList();
        Task<List<DropDownListModel>> GetFinCompName();
        Task<List<DropDownListModel>> GetVehicalTypeFltGroupList();
        Task<List<DropDownListModel>> GetLoanLedgerAccountList();
    }
}
