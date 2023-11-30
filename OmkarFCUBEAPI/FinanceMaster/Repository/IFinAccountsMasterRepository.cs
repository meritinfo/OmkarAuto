using FinanceMaster.Models;
using FinanceMasters.Models;

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
    }
}
