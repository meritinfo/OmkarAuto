using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IChallanSuppliLLPRepository
    {
        Task<ChallanListModel> GetChallanSuppliListLLP(ReportRequestModel request);
        Task<ResponseModel> ChallanSuppliSaveLLP(ChallanMasterModel challanModel);
        Task<ResponseModel> ChallanSuppliDeleteLLP(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateChallanSuppliLLP(RequestModel request);

    }
}
