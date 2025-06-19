using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IDprVehiPlacedBusiness
    {
        Task<DprVehiPlacedListModel> GetDprVehiPlacedList(RepReqModel request);
        Task<DprVehiPlacedModel> GetDprVehiPlacedDetails(RequestModel request);
        Task<DprVehiPlacedModel> GetVehicleDetails(RequestModel request);
        Task<List<DropDownListModel>> GetBrokerList();
        Task<List<DropDownListModel>> GetBrokerListLLP();
        Task<ResponseModel> DprVehiPlacedSave(DprVehiPlacedModel dprVehi);
        Task<ResponseModel> DprVehiUpdateAdvance(DprVehiPlacedModel dprVehi);
        Task<ResponseModel> DprVehiPlacedDelete(RequestModel requestModel);
        Task<ResponseModel> DprVehiPlacedAdvUpd(ReportRequestModel requestModel);
        Task<ResponseModel> DprVehiPlacedAddLr(DprVehiPlacedModel dprVehi);
        Task<ResponseModel> DprVehiPlacedDeleteLr(RequestModel requestModel);
        Task<ResponseModel> UpdateAssign(RequestModel requestModel);
    }

}
