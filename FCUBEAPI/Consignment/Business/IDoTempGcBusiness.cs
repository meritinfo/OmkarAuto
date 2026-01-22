using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface IDoTempGcBusiness
    {
        Task<DoTempGcListModel> GetDoTempgcList(RepReqModel request);
        Task<DoTempGcModel> GetDoTempgcInnerGridList(RequestModel request);
        Task<ResponseModel> DoTempgcSave(DoTempGcModel tempgc);
        Task<ResponseModel> DoTempGcDelete(RequestModel requestModel);
    }

}
