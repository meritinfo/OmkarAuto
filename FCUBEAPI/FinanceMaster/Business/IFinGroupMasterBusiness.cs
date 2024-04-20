using FinanceMaster.Models;
using FinanceMasters.Models;
using Shared.Models;

namespace FinanceMasters.Business
{
    /// <summary>
    /// Finance Account business interface methods
    /// </summary>
    public interface IFinGroupMasterBusiness
    {
        Task<ResponseModel> FinGroupMasterSave(FinGroupMasterModel finGroupMasterModel);
        Task<FinGroupMasterList> GetFinGroupMasterList(PageRequest request);
        Task<List<DropDownListModel>> GetAccountTypeList();
        Task<List<DropDownListModel>> GetSubAccountTypeList(RequestModel req);
        Task<List<DropDownListModel>> GetScheduleList();
        Task<ResponseModel> chkActName(RequestModel req);
        Task<ResponseModel> FinGroupDetailsDelete(RequestModel req);
    }

}
