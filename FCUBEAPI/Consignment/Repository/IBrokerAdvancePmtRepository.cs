using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public interface IBrokerAdvancePmtRepository
    {
        Task<BrokerAdvancePmtList> GetBrokerAdvancePmtList(ReportRequestModel request);
        Task<ResponseModel> BrokerAdvancePmtDelete(RequestModel req);
        Task<ResponseModel> BrokerAdvancePmtSave(BrokerAdvancePmtModel brokerAdvancePmtModel);
        Task<ResponseModel> GetPmtNo(RequestModel requestModel);



    }
}
