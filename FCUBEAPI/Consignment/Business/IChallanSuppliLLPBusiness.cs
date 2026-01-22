using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface IChallanSuppliLLPBusiness
    {
        Task<ChallanListModel> GetChallanSuppliListLLP(ReportRequestModel request);
        Task<ResponseModel> ChallanSuppliSaveLLP(ChallanMasterModel challanModel);
        Task<ResponseModel> ChallanSuppliDeleteLLP(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateChallanSuppliLLP(RequestModel request);
    }
}
