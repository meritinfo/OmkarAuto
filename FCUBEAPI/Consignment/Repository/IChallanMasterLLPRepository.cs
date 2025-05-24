using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public interface IChallanMasterLLPRepository
    {
        Task<ChallanListModelLLP> GetChallanMasterListLLP(ReportRequestModel request);
        Task<ChallanMasterModelLLP> GetChallanInnerGridListLLP(RequestModel request);
        Task<ResponseModel> ChallanMasterSaveLLP(ChallanMasterModelLLP challanModel);
        Task<ResponseModel> ChallanMasterDeleteLLP(RequestModel requestModel);
        Task<ResponseModel> GetChallanPrintPdfLLP(RequestModel request);
        Task<CciInvDetailModel> GetCCIInviceDetailLLP(RequestModel requestModel);
    }
}
