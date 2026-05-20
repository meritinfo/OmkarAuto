using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface ILorryHireReqRepository
    {
        Task<LorryHireReqListModel> GetLorryHireReqList(ReportRequestModel request);
        Task<ResponseModel> LorryHireReqSave(LorryHireReqModel lorryHire);
        Task<ResponseModel> LorryHireReqDelete(RequestModel requestModel);
        Task<LorryHireReqModel> GetChallanDetails(RequestModel request);
    }
}
