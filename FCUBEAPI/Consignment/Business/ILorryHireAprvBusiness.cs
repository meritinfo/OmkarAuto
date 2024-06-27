using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface ILorryHireAprvBusiness
    {
        Task<LorryHireReqListModel> GetLorryHireAprvList(ReportRequestModel request);
        Task<ResponseModel> LorryHireAprvSave(LorryHireReqModel lorryHire);
        Task<ResponseModel> LorryHireAprvDelete(RequestModel requestModel);

    }
}
