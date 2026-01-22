using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface ILorryHireReqBusiness
    {
        Task<LorryHireReqListModel> GetLorryHireReqList(ReportRequestModel request);
        Task<ResponseModel> LorryHireReqSave(LorryHireReqModel lorryHire);
        Task<ResponseModel> LorryHireReqDelete(RequestModel requestModel);
        Task<LorryHireReqModel> GetChallanDetails(RequestModel request);

    }
}
