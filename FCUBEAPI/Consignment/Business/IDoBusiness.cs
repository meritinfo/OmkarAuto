using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IDoBusiness
    {

        Task<DoListModel> GetDoList(ReportRequestModel request);
        Task<ResponseModel> DoSave(DoModel doModel);
        Task<ResponseModel> DoDelete(RequestModel requestModel);
        Task<DoModel> GetDoVehiDetails(RequestModel request);
    }

}
