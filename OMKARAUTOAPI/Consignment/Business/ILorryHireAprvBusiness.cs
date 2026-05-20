using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface ILorryHireAprvBusiness
    {
        Task<LorryHireReqListModel> GetLorryHireAprvList(ReportRequestModel request);
        Task<ResponseModel> LorryHireAprvSave(LorryHireReqModel lorryHire);
        Task<ResponseModel> LorryHireAprvDelete(RequestModel requestModel);

    }
}
