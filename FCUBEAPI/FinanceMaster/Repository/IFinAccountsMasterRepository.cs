using FinanceMaster.Models;
using FinanceMasters.Models;
using Shared.Models;

namespace FinanceMasters.Repository
{
    /// <summary>
    /// Finance Account Master service interface methods
    /// </summary>
    public interface IFinAccountsMasterRepository
    {
        Task<ResponseModel> FinAccountsMasterSave(FinAccountsMasterModel finAccountsMasterModel);
        Task<FinAccountsMasterList> GetFinAccountsMasterList(PageRequest request);
        Task<List<DropDownListModel>> GetFinActLedgertype();
        Task<List<DropDownListModel>> GetEmpList();
        Task<ResponseModel> FinAccountsGSTSave(FinAccountsMasterGstModel finAccountsMasterModel);
        Task<ResponseModel> FinAccountGstDelete(RequestModel request);
        Task<FinAccountsMasterGstModel> GetFinAccountGstList(RequestModel request);
    }
}
