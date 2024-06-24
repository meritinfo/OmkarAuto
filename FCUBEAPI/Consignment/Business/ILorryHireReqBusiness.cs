using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface ILorryHireReqBusiness
    {
        Task<LorryHireReqListModel> GetLorryHireReqList(ReportRequestModel request);
        Task<ResponseModel> LorryHireReqSave(LorryHireReqModel lorryHire);
        Task<ResponseModel> LorryHireReqDelete(RequestModel requestModel);
        Task<LorryHireReqModel> GetChallanDetails(RequestModel request);

    }
}
