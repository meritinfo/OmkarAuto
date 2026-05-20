using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface ILorryHireAprvRepository
    {
        Task<LorryHireReqListModel> GetLorryHireAprvList(ReportRequestModel request);
        Task<ResponseModel> LorryHireAprvSave(LorryHireReqModel lorryHire);
        Task<ResponseModel> LorryHireAprvDelete(RequestModel requestModel);
    }
}
