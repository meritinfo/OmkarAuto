using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Office2016.Excel;
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
        public async Task<ResponseModel> GetLorryHirePaymentExcel(ReportRequestModel request)
        {
            return await lorryHireRepository.GetLorryHirePaymentExcel(request);
        }
        public async Task<LorryHireMasterLLPModel> GetLorryHireInnerGridLLP(RequestModel request)
        {
            return await lorryHireRepository.GetLorryHireInnerGridLLP(request);
        }
        public async Task<ResponseModel> LorryHireMasterSaveLLP(LorryHireMasterLLPModel lorryHire)
        {
            return await lorryHireRepository.LorryHireMasterSaveLLP(lorryHire);
        }
        public async Task<LorryHireMasterLLPModel> GetChallanLorryhireDetailsLLP(ReportRequestModel request)
        {
            return await lorryHireRepository.GetChallanLorryhireDetailsLLP(request);
        }
        public async Task<LhpmChallanViewModel> GetLorryHireChallanDetailViewLLP(ReportRequestModel request)
        {
            return await lorryHireRepository.GetLorryHireChallanDetailViewLLP(request);
        }
  }
}
