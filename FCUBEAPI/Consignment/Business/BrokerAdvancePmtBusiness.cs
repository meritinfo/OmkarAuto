using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public class BrokerAdvancePmtBusiness: IBrokerAdvancePmtBusiness
    {
        readonly IBrokerAdvancePmtRepository brokerAdvancePmtRepository;
        public BrokerAdvancePmtBusiness(IBrokerAdvancePmtRepository _brokerAdvancePmtRepository)
        {
            brokerAdvancePmtRepository = _brokerAdvancePmtRepository;
        }
        public async Task<BrokerAdvancePmtList> GetBrokerAdvancePmtList(ReportRequestModel request)
        {
            return await brokerAdvancePmtRepository.GetBrokerAdvancePmtList(request);
        }
        public async Task<ResponseModel> BrokerAdvancePmtSave(BrokerAdvancePmtModel brokerAdvancePmtModel)
        {
            return await brokerAdvancePmtRepository.BrokerAdvancePmtSave(brokerAdvancePmtModel);
        }
 
        public async Task<ResponseModel> BrokerAdvancePmtDelete(RequestModel req)
        {
            return await brokerAdvancePmtRepository.BrokerAdvancePmtDelete(req);
        }
        public async Task<ResponseModel> GetPmtNo(RequestModel requestModel)
        {
            return await brokerAdvancePmtRepository.GetPmtNo(requestModel);
        }

    }
}
