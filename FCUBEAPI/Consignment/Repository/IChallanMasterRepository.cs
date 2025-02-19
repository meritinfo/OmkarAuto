using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public interface IChallanMasterRepository
    {
        Task<ChallanListModel> GetChallanMasterList(ReportRequestModel request);
        Task<ChallanMasterModel> GetChallanInnerGridList(RequestModel request);
        Task<ResponseModel> ChallanMasterSave(ChallanMasterModel challanModel);
        Task<ResponseModel> ChallanMasterDelete(RequestModel requestModel);
        Task<ResponseModel> GetChallanNo(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateChallan(RequestModel requestModel);
        Task<ChallanMasterModel> GetConsignmentId(RequestModel requestModel);
        Task<ChallanMasterModel> GetChallanDetailsFromLR(RequestModel request);
        Task<PanApiResultModel> GetPanValidDetails(RequestModel request);
        Task<ResponseModel> CheckChallanPrepForLr(RequestModel request);
        Task<ChallanMasterModel> GetChallanEnqDetails(RequestModel req);
        Task<ChallanMasterModel> GetChallanEnqInnerGridList(RequestModel request);
        Task<ResponseModel> GetChallanPrintPdf(RequestModel request);
        Task<ResponseModel> GetPanwiseTdsRate(RequestModel requestModel);
        Task<ReportRequestModel> GetLhPanTdsRate(RequestModel requestModel);
        Task<ResponseModel> GetBranchPanApiUse(RequestModel requestModel);
    }
}
