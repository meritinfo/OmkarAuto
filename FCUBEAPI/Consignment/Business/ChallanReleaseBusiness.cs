using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class ChallanReleaseBusiness: IChallanReleaseBusiness
    {
        readonly IChallanReleaseRepository challanReleaseRepository;
        public ChallanReleaseBusiness(IChallanReleaseRepository _challanReleaseRepository)
        {
            challanReleaseRepository = _challanReleaseRepository;
        }
        public async Task<ChallanReleaseListModel> GetChallanReleaseList(ReportRequestModel request)
        {
            return await challanReleaseRepository.GetChallanReleaseList(request);
        }
        public async Task<ResponseModel> ChallanReleaseSave(ChallanReleaseModel challanReleaseModel)
        {
            return await challanReleaseRepository.ChallanReleaseSave(challanReleaseModel);
        }
        public async Task<ResponseModel> ChallanReleaseDelete(RequestModel requestModel)
        {
            return await challanReleaseRepository.ChallanReleaseDelete(requestModel);
        }
        public async Task<ChallanMasterModel> SearchChallanDetails(ReportRequestModel req)
        {
            return await challanReleaseRepository.SearchChallanDetails(req);
        }
        public async Task<ResponseModel> CheckDuplicateChallanRelease(ReportRequestModel requestModel)
        {
            return await challanReleaseRepository.CheckDuplicateChallanRelease(requestModel);
        }
    }
}
