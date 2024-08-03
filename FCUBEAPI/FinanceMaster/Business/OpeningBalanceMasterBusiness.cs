using FinanceMasters.Models;
using FinanceMasters.Repository;
using Shared.Models;

namespace FinanceMasters.Business
{
    public class OpeningBalanceMasterBusiness : IOpeningBalanceMasterBusiness
    {
        readonly IOpeningBalanceMasterRepository openBalanceMasterRepository;
        public OpeningBalanceMasterBusiness(IOpeningBalanceMasterRepository _openBalanceMasterRepository)
        {
            openBalanceMasterRepository = _openBalanceMasterRepository;
        }

        public async Task<ResponseModel> OpeningBalanceSave(OpeningBalanceMasterModel openingBalanceMaster)
        {
            return await openBalanceMasterRepository.OpeningBalanceSave(openingBalanceMaster);
        }
        public async Task<OpeningBalanceMasterList> GetOpeningBalMasterList(PageRequest request)
        {
            return await openBalanceMasterRepository.GetOpeningBalMasterList(request);
        }
        public async Task<OpeningBalanceMasterModel> GetOpeningBalDetailList(OpeningBalanceRequest req)
        {
            return await openBalanceMasterRepository.GetOpeningBalDetailList(req);
        }
        public async Task<List<DropDownListModel>> GetAccountList()
        {
            return await openBalanceMasterRepository.GetAccountList();
        }
        public async Task<ResponseModel> OpeningBalanceDelete(OpeningBalanceRequest req)
        {
            return await openBalanceMasterRepository.OpeningBalanceDelete(req);
        }
        public async Task<ResponseModel> ConsolidateOpeningBalUpdate(RequestModel req)
        {
            return await openBalanceMasterRepository.ConsolidateOpeningBalUpdate(req);
        }
        public async Task<ConsolidatedOpenBalListModel> GetConsolidateOpeningBalList(RequestModel req)
        {
            return await openBalanceMasterRepository.GetConsolidateOpeningBalList(req);
        }
    }
}
