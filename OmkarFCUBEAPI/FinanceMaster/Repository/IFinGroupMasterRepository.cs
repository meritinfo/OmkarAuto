using FinanceMaster.Models;
using FinanceMasters.Models;

namespace FinanceMasters.Repository
{
    /// <summary>
    /// Finance Account Master service interface methods
    /// </summary>
    public interface IFinGroupMasterRepository
    {
        Task<ResponseModel> FinGroupMasterSave(FinGroupMasterModel finGroupMasterModel);
        Task<FinGroupMasterList> GetFinGroupMasterList(PageRequest request);
        Task<List<DropDownListModel>> GetAccountTypeList();
        Task<List<DropDownListModel>> GetSubAccountTypeList(RequestModel req);
        Task<List<DropDownListModel>> GetScheduleList();
        Task<ResponseModel> chkActName(string AccountName);

    }
}
