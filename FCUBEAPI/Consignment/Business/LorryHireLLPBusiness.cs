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
    public class LorryHireLLPBusiness: ILorryHireLLPBusiness
    { 
    readonly ILorryHireLLPRepository lorryHireRepository;
     public LorryHireLLPBusiness(ILorryHireLLPRepository _lorryHireRepository)
    {
        lorryHireRepository = _lorryHireRepository;
    }

    public async Task<LorryHireListLLPModel> GetLorryHirePaymentListLLP(ReportRequestModel request)
    {
        return await lorryHireRepository.GetLorryHirePaymentListLLP(request);
    }
    public async Task<LorryHireMasterLLPModel> GetLorryHireInnerGridLLP(RequestModel request)
    {
        return await lorryHireRepository.GetLorryHireInnerGridLLP(request);
    }
    public async Task<ResponseModel> ChkLHPMBrokerDisputeDetails(ReportRequestModel request)
    {
        return await lorryHireRepository.ChkLHPMBrokerDisputeDetails(request);
    }
    public async Task<ResponseModel> LorryHireMasterSaveLLP(LorryHireMasterLLPModel lorryHire)
    {
        return await lorryHireRepository.LorryHireMasterSaveLLP(lorryHire);
    }
    public async Task<ResponseModel> LorryHireMasterDeleteLLP(RequestModel request)
    {
        return await lorryHireRepository.LorryHireMasterDeleteLLP(request);
    }
    public async Task<LorryHireMasterLLPModel> GetChallanLorryhireDetailsLLP(ReportRequestModel request)
    {
        return await lorryHireRepository.GetChallanLorryhireDetailsLLP(request);
    }
    public async Task<ResponseModel> GetLorryHirePmtNo(RequestModel requestModel)
    {
        return await lorryHireRepository.GetLorryHirePmtNo(requestModel);
    }
    public async Task<ResponseModel> CheckChallanNoExists(RequestModel requestModel)
    {
        return await lorryHireRepository.CheckChallanNoExists(requestModel);
    }
    public async Task<ResponseModel> GetLorryHirePrintPdf(RequestModel request)
    {
        return await lorryHireRepository.GetLorryHirePrintPdf(request);
    }
}
}
