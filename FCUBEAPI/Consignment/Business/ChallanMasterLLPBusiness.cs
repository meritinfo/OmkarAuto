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
    public class ChallanMasterLLPBusiness: IChallanMasterLLPBusiness
    {
        readonly IChallanMasterLLPRepository challanRepository;
        public ChallanMasterLLPBusiness(IChallanMasterLLPRepository _challanRepository)
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
        public async Task<ResponseModel> GetChallanPrintPdfLLP(RequestModel request)
        {
            return await challanRepository.GetChallanPrintPdfLLP(request);
        }
        public async Task<CciInvDetailModel> GetCCIInviceDetailLLP(RequestModel requestModel)
        {
            return await challanRepository.GetCCIInviceDetailLLP(requestModel);
        }
        public async Task<ResponseModel> ChkPanDeclaration(RequestModel requestModel)
        {
            return await challanRepository.ChkPanDeclaration(requestModel);
        }
        public async Task<ChallanMasterModelLLP> GetBrokerPanDetails(RequestModel request)
        {
            return await challanRepository.GetBrokerPanDetails(request);
        }

    }

}
