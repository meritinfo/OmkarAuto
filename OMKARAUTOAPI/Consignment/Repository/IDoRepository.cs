using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IDoRepository
    {
        Task<DoListModel> GetDoList(ReportRequestModel request);
        Task<ResponseModel> DoSave(DoModel doModel);
        Task<ResponseModel> DoDelete(RequestModel requestModel);
        Task<DoVehiPlacedModel> GetDoVehiDetails(RequestModel request);
        Task<DoVehiPlacedListModel> GetDoVehiPlacedList(ReportRequestModel request);
        Task<ResponseModel> DoVehiPlacedSave(DoVehiPlacedModel dprModel);
        Task<ResponseModel> DoVehiPlacedDelete(RequestModel requestModel);
    }
}
