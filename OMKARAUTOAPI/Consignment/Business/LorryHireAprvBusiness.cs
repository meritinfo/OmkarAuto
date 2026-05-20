using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class LorryHireAprvBusiness : ILorryHireAprvBusiness
    {
        readonly ILorryHireAprvRepository lorryHireRepository;
        public LorryHireAprvBusiness(ILorryHireAprvRepository _lorryHireRepository)
        {
            lorryHireRepository = _lorryHireRepository;
        }

        public async Task<LorryHireReqListModel> GetLorryHireAprvList(ReportRequestModel request)
        {
            return await lorryHireRepository.GetLorryHireAprvList(request);
        }
        public async Task<ResponseModel> LorryHireAprvSave(LorryHireReqModel lorryHire)
        {
            return await lorryHireRepository.LorryHireAprvSave(lorryHire);
        }
        public async Task<ResponseModel> LorryHireAprvDelete(RequestModel request)
        {
            return await lorryHireRepository.LorryHireAprvDelete(request);
        }
    }
}
