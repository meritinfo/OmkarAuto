using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface IDprBusiness
    {

        Task<DprListModel> GetDprMasterList(ReportRequestModel request);
        Task<DprModel> GetDprInnerGridList(RequestModel request);
        Task<ResponseModel> DprMasterSave(DprModel dprModel);
        Task<ResponseModel> DprMasterDelete(RequestModel requestModel);
    }

}
