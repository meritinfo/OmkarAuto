using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface IBrokerAdvancePmtBusiness
    {
        Task<BrokerAdvancePmtList> GetBrokerAdvancePmtList(ReportRequestModel request);
        Task<ResponseModel> BrokerAdvancePmtDelete(RequestModel req);
        Task<ResponseModel> BrokerAdvancePmtSave(BrokerAdvancePmtModel brokerAdvancePmtModel);
        Task<ResponseModel> GetPmtNo(RequestModel requestModel);

    }
}
