using FinanceMaster.Models;
using FinanceMasters.Models;
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
    }

}
