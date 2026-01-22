using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface IChallanReleaseBusiness
    {
        Task<ResponseModel> ChallanReleaseDelete(RequestModel requestModel);
        Task<ResponseModel> ChallanReleaseSave(ChallanReleaseModel challanReleaseModel);
        Task<ChallanReleaseListModel> GetChallanReleaseList(ReportRequestModel request);
        Task<ChallanMasterModel> SearchChallanDetails(ReportRequestModel req);
        Task<ResponseModel> CheckDuplicateChallanRelease(ReportRequestModel requestModel);



    }
}
