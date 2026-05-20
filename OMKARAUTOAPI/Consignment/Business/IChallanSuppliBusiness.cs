using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface IChallanSuppliBusiness
    {
        Task<ChallanListModel> GetChallanSuppliList(ReportRequestModel request);
        Task<ResponseModel> ChallanSuppliSave(ChallanMasterModel challanModel);
        Task<ResponseModel> ChallanSuppliDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateChallanSuppli(RequestModel requestModel);
    }
}
