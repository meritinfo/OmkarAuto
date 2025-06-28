using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public interface ILorryHireLLPBusiness
    {
        Task<LorryHireListLLPModel> GetLorryHirePaymentListLLP(ReportRequestModel request);
        Task<ResponseModel> GetLorryHirePaymentExcel(ReportRequestModel request);
        Task<LorryHireMasterLLPModel> GetLorryHireInnerGridLLP(RequestModel request);
        Task<ResponseModel> LorryHireMasterSaveLLP(LorryHireMasterLLPModel lorryHire);
        Task<LorryHireMasterLLPModel> GetChallanLorryhireDetailsLLP(ReportRequestModel request);
    }
}
