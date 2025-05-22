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
        Task<ResponseModel> GetChallanNoLLP(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateChallanLLP(RequestModel requestModel);
        Task<ChallanMasterModelLLP> GetConsignmentIdLLP(RequestModel requestModel);
        Task<ChallanMasterModelLLP> GetChallanDetailsFromLRLLP(RequestModel request);
        Task<PanApiResultModel> GetPanValidDetailsLLP(RequestModel request);
        Task<ResponseModel> CheckChallanPrepForLrLLP(RequestModel request);
        Task<ChallanMasterModelLLP> GetChallanEnqDetailsLLP(RequestModel req);
        Task<ChallanMasterModelLLP> GetChallanEnqInnerGridListLLP(RequestModel request);
        Task<ResponseModel> GetChallanPrintPdfLLP(RequestModel request);
        Task<ResponseModel> ChkPanDeclaration(RequestModel requestModel);
        Task<CciInvDetailModel> GetCCIInviceDetailLLP(RequestModel requestModel);
    }
}
