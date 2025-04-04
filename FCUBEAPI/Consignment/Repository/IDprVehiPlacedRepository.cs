using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IDprVehiPlacedRepository
    {
        Task<DprVehiPlacedListModel> GetDprVehiPlacedList(ReportRequestModel request);
        Task<DprVehiPlacedModel> GetDprVehiPlacedDetails(RequestModel request);
        Task<DprVehiPlacedModel> GetVehicleDetails(RequestModel request);
        Task<List<DropDownListModel>> GetBrokerList();
        Task<ResponseModel> DprVehiPlacedSave(DprVehiPlacedModel dprVehi);
        Task<ResponseModel> DprVehiUpdateAdvance(DprVehiPlacedModel dprVehi);
        Task<ResponseModel> DprVehiPlacedDelete(RequestModel requestModel);
        Task<ResponseModel> DprVehiPlacedAdvUpd(ReportRequestModel requestModel);
        Task<ResponseModel> DprVehiPlacedAddLr(DprVehiPlacedModel dprVehi);
        Task<ResponseModel> UpdateAssign(RequestModel requestModel);
    }
}
