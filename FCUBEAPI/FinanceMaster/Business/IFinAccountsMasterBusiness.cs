using FinanceMaster.Models;
using FinanceMasters.Models;
using Shared.Models;

namespace FinanceMasters.Business
{
    /// <summary>
    /// Finance Account business interface methods
    /// </summary>
    public interface IFinAccountsMasterBusiness
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
