using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public interface IChallanMasterLLPBusiness
    {

        Task<ChallanListModelLLP> GetChallanMasterListLLP(ReportRequestModel request);
        Task<ChallanMasterModelLLP> GetChallanInnerGridListLLP(RequestModel request);
        Task<ResponseModel> ChallanMasterSaveLLP(ChallanMasterModelLLP challanModel);
        Task<ResponseModel> ChallanMasterDeleteLLP(RequestModel requestModel);
        Task<ResponseModel> GetChallanPrintPdfLLP(RequestModel request);
        Task<CciInvoiceDtlModel> GetCCIInviceDetailLLP(RequestModel requestModel);
        Task<ResponseModel> ChkPanDeclaration(RequestModel requestModel);
        Task<ChallanMasterModelLLP> GetBrokerPanDetails(RequestModel request);
    }
}
