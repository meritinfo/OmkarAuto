
using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Repository
{
    public interface IVehicleFltMasterRepository
    {
        Task<ResponseModel> VehicleFltMasterSave(VehicleFltMasterModel vehicleFltMasterModel);
        Task<List<DropDownListModel>> GetFinCompName();
        Task<VehicleFltMasterList> GetVehicleFltMasterList(PageRequest request);
        Task<ResponseModel> VehicalMasterDetailsDelete(RequestModel req);
        Task<List<DropDownListModel>> GetVehicalTypeList();
        Task<List<DropDownListModel>> GetVehicalLedgerAccountList();
        Task<List<DropDownListModel>> GetVehicalAssetAccountList();
        Task<List<DropDownListModel>> GetVehicalMfrList();
        Task<ResponseModel> ChkVehicalNoExist(RequestModel req);
        Task<VehicleFltMasterModel> GetVehicleFltInnerGridList(RequestModel req);

        Task<ResponseModel> GetVehicleMasterExcel(ReportRequestModel request);
        Task<List<DropDownListModel>> GetVehicalTypeGroupList();
        Task<List<DropDownListModel>> GetFltGroupList();
        Task<List<DropDownListModel>> GetLoanLedgerAccountList();
        Task<List<DropDownListModel>> GetVehicalTypeFltGroupList();
    }
}
