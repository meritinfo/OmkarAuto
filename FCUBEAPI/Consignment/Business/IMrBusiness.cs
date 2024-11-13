using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IMrBusiness
    {
        Task<MrListModel> GetMrMstList(PageFromDtToDtRequest request);
        Task<List<DropDownListModel>> GetPartyGroupList();
        Task<MrModel> GetOnAcMrSearchList(DropDownListModel request);
        Task<MrModel> GetBillLRSearchDtls(ReportRequestModel request);
        Task<MrModel> GetMrInnerGridList(RequestModel request);
        Task<ResponseModel> MrMstDelete(RequestModel request);
        Task<ResponseModel> MrMstSave(MrModel mr);
    }

}
