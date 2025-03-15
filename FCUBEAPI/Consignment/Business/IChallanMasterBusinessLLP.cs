using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public interface IChallanMasterBusinessLLP
    {

        Task<ChallanListModel> GetChallanMasterListLLP(ReportRequestModel request);
        Task<ChallanMasterModel> GetChallanInnerGridListLLP(RequestModel request);
        Task<ResponseModel> ChallanMasterSaveLLP(ChallanMasterModel challanModel);
        Task<ResponseModel> ChallanMasterDeleteLLP(RequestModel requestModel);
        Task<ResponseModel> GetChallanNoLLP(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateChallanLLP(RequestModel requestModel);
        Task<ChallanMasterModel> GetConsignmentIdLLP(RequestModel requestModel);
        Task<ChallanMasterModel> GetChallanDetailsFromLRLLP(RequestModel request);
        Task<PanApiResultModel> GetPanValidDetailsLLP(RequestModel request);
        Task<ResponseModel> CheckChallanPrepForLrLLP(RequestModel request);
        Task<ChallanMasterModel> GetChallanEnqDetailsLLP(RequestModel req);
        Task<ChallanMasterModel> GetChallanEnqInnerGridListLLP(RequestModel request);
        Task<ResponseModel> GetChallanPrintPdfLLP(RequestModel request);
        Task<ResponseModel> GetPanwiseTdsRateLLP(RequestModel requestModel);
        Task<ReportRequestModel> GetLhPanTdsRateLLP(RequestModel requestModel);
        Task<ResponseModel> GetBranchPanApiUseLLP(RequestModel requestModel);
    }
}
