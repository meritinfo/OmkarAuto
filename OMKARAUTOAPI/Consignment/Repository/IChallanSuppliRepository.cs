using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IChallanSuppliRepository
    {
        Task<ChallanListModel> GetChallanSuppliList(ReportRequestModel request);
        Task<ResponseModel> ChallanSuppliSave(ChallanMasterModel challanModel);
        Task<ResponseModel> ChallanSuppliDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateChallanSuppli(RequestModel request);
    }
}
