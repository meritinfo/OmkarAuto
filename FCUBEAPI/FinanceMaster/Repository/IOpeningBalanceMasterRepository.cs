using FinanceMasters.Models;
using Shared.Models;

namespace FinanceMasters.Repository
{
    /// <summary>
    /// Finance Account Master service interface methods
    /// </summary>
    public interface IOpeningBalanceMasterRepository
    {
        Task<ResponseModel> OpeningBalanceSave(OpeningBalanceMasterModel openingBalanceMaster);
        Task<OpeningBalanceMasterList> GetOpeningBalMasterList(PageRequest request);
        Task<OpeningBalanceMasterModel> GetOpeningBalDetailList(OpeningBalanceRequest req);
        Task<List<DropDownListModel>> GetAccountList();
        Task<ResponseModel> OpeningBalanceDelete(OpeningBalanceRequest req);
        Task<ResponseModel> ConsolidateOpeningBalUpdate(RequestModel req);
        Task<ConsolidatedOpenBalListModel> GetConsolidateOpeningBalList(RequestModel req);

    }
}
