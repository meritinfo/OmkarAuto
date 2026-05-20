using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class ChallanSuppliBusiness : IChallanSuppliBusiness
    {
        readonly IChallanSuppliRepository challanRepository;
        public ChallanSuppliBusiness(IChallanSuppliRepository _challanRepository)
        {
            challanRepository = _challanRepository;
        }
        public async Task<ChallanListModel> GetChallanSuppliList(ReportRequestModel request)
        {
            return await challanRepository.GetChallanSuppliList(request);
        }
        public async Task<ResponseModel> ChallanSuppliSave(ChallanMasterModel challanModel)
        {
            return await challanRepository.ChallanSuppliSave(challanModel);
        }
        public async Task<ResponseModel> ChallanSuppliDelete(RequestModel request)
        {
            return await challanRepository.ChallanSuppliDelete(request);
        }
        public async Task<ResponseModel> CheckDuplicateChallanSuppli(RequestModel request)
        {
            return await challanRepository.CheckDuplicateChallanSuppli(request);
        }

    }

}
