using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IDoVehiInRepository
    {
        Task<DoVehicleInListModel> GetDoVehicleInList(ReportRequestModel request);
        Task<ResponseModel> DoVehicleInSave(DoVehicleInModel dprModel);
        Task<ResponseModel> DoVehicleInDelete(RequestModel requestModel);
        Task<DoVehicleInModel> GetDoVehiPlacedDetails(RequestModel request);
        Task<DoVehicleInModel> GetTruckDetails(RequestModel request);
    }
}
