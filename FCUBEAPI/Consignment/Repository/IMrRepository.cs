using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IMrRepository
    {
        Task<MrListModel> GetMrMstList(PageFromDtToDtRequest request);
        Task<ResponseModel> GetMrNo();
        Task<List<DropDownListModel>> GetPartyGroupList();
        Task<MrModel> GetOnAcMrSearchList(DropDownListModel request);
        Task<MrModel> GetBillLRSearchDtls(ReportRequestModel request);
        Task<MrModel> GetMrInnerGridList(RequestModel request);
        Task<ResponseModel> MrMstDelete(RequestModel request);
        Task<ResponseModel> MrMstSave(MrModel mr);
        Task<MrModel> GetMrEnqInnerGridList(RequestModel request);
        Task<MrModel> GetMrEnqDetails(RequestModel req);
    }
}
