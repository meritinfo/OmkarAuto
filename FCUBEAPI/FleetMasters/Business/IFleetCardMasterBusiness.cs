using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Business
{
    public interface IFleetCardMasterBusiness
    {
        Task<ResponseModel> FleetCardMasterSave(FleetCardMasterModel FleetCardMasterModel);
        Task<FleetCardMasterList> GetFleetCardMasterList(PageRequest request);
        Task<List<DropDownListModel>> GetCardledgerAcList();
        Task<ResponseModel> FleetCardMasterDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateCardNo(RequestModel request);
        Task<ResponseModel> CheckDuplicateCardCode(RequestModel request);
        Task<ResponseModel> CheckVehicleCardLinked(RequestModel request);
    }
}
