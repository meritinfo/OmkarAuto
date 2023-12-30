using FinanceMaster.Models;
using FinanceMasters.Models;
using Shared.Models;

namespace FinanceMasters.Business
{
    /// <summary>
    /// Finance Account business interface methods
    /// </summary>
    public interface IOpeningBalanceMasterBusiness
    {
        Task<ResponseModel> OpeningBalanceSave(OpeningBalanceMasterModel openingBalanceMaster);
        Task<OpeningBalanceMasterList> GetOpeningBalMasterList(PageRequest request);
        Task<OpeningBalanceMasterModel> GetOpeningBalDetailList(OpeningBalanceRequest req);
        Task<List<DropDownListModel>> GetAccountList();
        Task<ResponseModel> OpeningBalanceDelete(OpeningBalanceRequest req);
    }

}
