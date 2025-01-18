using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IDoRepository
    {
        Task<DoListModel> GetDoList(ReportRequestModel request);
        Task<ResponseModel> DoSave(DoModel doModel);
        Task<ResponseModel> DoDelete(RequestModel requestModel);
        Task<DoModel> GetDoVehiDetails(RequestModel request);
    }
}
