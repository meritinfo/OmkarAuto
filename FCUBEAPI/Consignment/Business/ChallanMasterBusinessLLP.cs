using Consignment.Models;
using Consignment.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public class ChallanMasterBusinessLLP: IChallanMasterBusinessLLP
    {
        readonly IChallanMasterRepositoryLLP challanRepository;
        public ChallanMasterBusinessLLP(IChallanMasterRepositoryLLP _challanRepository)
        {
            challanRepository = _challanRepository;
        }
        public async Task<ChallanListModelLLP> GetChallanMasterListLLP(ReportRequestModel request)
        {
            return await challanRepository.GetChallanMasterListLLP(request);
        }
        public async Task<ChallanMasterModelLLP> GetChallanInnerGridListLLP(RequestModel request)
        {
            return await challanRepository.GetChallanInnerGridListLLP(request);
        }
        public async Task<ResponseModel> ChallanMasterSaveLLP(ChallanMasterModelLLP challanModel)
        {
            return await challanRepository.ChallanMasterSaveLLP(challanModel);
        }
        public async Task<ResponseModel> ChallanMasterDeleteLLP(RequestModel request)
        {
            return await challanRepository.ChallanMasterDeleteLLP(request);
        }
        public async Task<ResponseModel> GetChallanNoLLP(RequestModel request)
        {
            return await challanRepository.GetChallanNoLLP(request);
        }
        public async Task<ResponseModel> CheckDuplicateChallanLLP(RequestModel request)
        {
            return await challanRepository.CheckDuplicateChallanLLP(request);
        }
        public async Task<ChallanMasterModelLLP> GetConsignmentIdLLP(RequestModel request)
        {
            return await challanRepository.GetConsignmentIdLLP(request);
        }
        public async Task<ChallanMasterModelLLP> GetChallanDetailsFromLRLLP(RequestModel request)
        {
            return await challanRepository.GetChallanDetailsFromLRLLP(request);
        }
        public async Task<PanApiResultModel> GetPanValidDetailsLLP(RequestModel request)
        {
            return await challanRepository.GetPanValidDetailsLLP(request);
        }
        public async Task<ResponseModel> CheckChallanPrepForLrLLP(RequestModel request)
        {
            return await challanRepository.CheckChallanPrepForLrLLP(request);
        }
        public async Task<ChallanMasterModelLLP> GetChallanEnqInnerGridListLLP(RequestModel request)
        {
            return await challanRepository.GetChallanEnqInnerGridListLLP(request);
        }
        public async Task<ChallanMasterModelLLP> GetChallanEnqDetailsLLP(RequestModel req)
        {
            return await challanRepository.GetChallanEnqDetailsLLP(req);
        }
        public async Task<ResponseModel> GetChallanPrintPdfLLP(RequestModel request)
        {
            return await challanRepository.GetChallanPrintPdfLLP(request);
        }
        public async Task<ResponseModel> GetPanwiseTdsRateLLP(RequestModel request)
        {
            return await challanRepository.GetPanwiseTdsRateLLP(request);
        }
        public async Task<ReportRequestModel> GetLhPanTdsRateLLP(RequestModel request)
        {
            return await challanRepository.GetLhPanTdsRateLLP(request);
        }
        public async Task<ResponseModel> GetBranchPanApiUseLLP(RequestModel requestModel)
        {
            return await challanRepository.GetBranchPanApiUseLLP(requestModel);
        }
        public async Task<CciInvDetailModel> GetCCIInviceDetailLLP(RequestModel requestModel)
        {
            return await challanRepository.GetCCIInviceDetailLLP(requestModel);
        }

    }

}
