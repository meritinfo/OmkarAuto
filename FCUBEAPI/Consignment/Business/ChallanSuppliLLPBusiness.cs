using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class ChallanSuppliLLPBusiness: IChallanSuppliLLPBusiness
    {
        readonly IChallanSuppliLLPRepository challanRepository;
        public ChallanSuppliLLPBusiness(IChallanSuppliLLPRepository _challanRepository)
        {
            challanRepository = _challanRepository;
        }
        public async Task<ChallanListModel> GetChallanSuppliListLLP(ReportRequestModel request)
        {
            return await challanRepository.GetChallanSuppliListLLP(request);
        }
        public async Task<ResponseModel> ChallanSuppliSaveLLP(ChallanMasterModel challanModel)
        {
            return await challanRepository.ChallanSuppliSaveLLP(challanModel);
        }
        public async Task<ResponseModel> ChallanSuppliDeleteLLP(RequestModel request)
        {
            return await challanRepository.ChallanSuppliDeleteLLP(request);
        }
        public async Task<ResponseModel> CheckDuplicateChallanSuppliLLP(RequestModel request)
        {
            return await challanRepository.CheckDuplicateChallanSuppliLLP(request);
        }
    }
}
