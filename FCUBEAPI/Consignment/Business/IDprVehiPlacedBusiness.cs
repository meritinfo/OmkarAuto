using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IDprVehiPlacedBusiness
    {
        Task<DprVehiPlacedListModel> GetDprVehiPlacedList(ReportRequestModel request);
        Task<DprVehiPlacedModel> GetDprVehiPlacedDetails(RequestModel request);
        Task<DprVehiPlacedModel> GetVehicleDetails(RequestModel request);
        Task<List<DropDownListModel>> GetBrokerList();
        Task<ResponseModel> DprVehiPlacedSave(DprVehiPlacedModel dprVehi);
        Task<ResponseModel> DprVehiPlacedDelete(RequestModel requestModel);
        Task<ResponseModel> DprVehiPlacedAdvUpd(ReportRequestModel requestModel);
    }

}
