using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class LorryHireReqBusiness : ILorryHireReqBusiness
    {
        readonly ILorryHireReqRepository lorryHireRepository;
        public LorryHireReqBusiness(ILorryHireReqRepository _lorryHireRepository)
        {
            lorryHireRepository = _lorryHireRepository;
        }

        public async Task<LorryHireReqListModel> GetLorryHireReqList(ReportRequestModel request)
        {
            return await lorryHireRepository.GetLorryHireReqList(request);
        }
        public async Task<ResponseModel> LorryHireReqSave(LorryHireReqModel lorryHire)
        {
            return await lorryHireRepository.LorryHireReqSave(lorryHire);
        }
        public async Task<ResponseModel> LorryHireReqDelete(RequestModel request)
        {
            return await lorryHireRepository.LorryHireReqDelete(request);
        }
        public async Task<LorryHireReqModel> GetChallanDetails(RequestModel request)
        {
            return await lorryHireRepository.GetChallanDetails(request);
        }
    }
}
