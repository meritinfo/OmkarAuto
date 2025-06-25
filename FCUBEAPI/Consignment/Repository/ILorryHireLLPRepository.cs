using Consignment.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public interface ILorryHireLLPRepository
    {
        Task<LorryHireListLLPModel> GetLorryHirePaymentListLLP(ReportRequestModel request);
        Task<ResponseModel> GetLorryHirePaymentExcel(ReportRequestModel request);
        Task<LorryHireMasterLLPModel> GetLorryHireInnerGridLLP(RequestModel request);
        Task<ResponseModel> LorryHireMasterSaveLLP(LorryHireMasterLLPModel lorryHire);
        Task<ResponseModel> LorryHireMasterDeleteLLP(RequestModel requestModel);
        Task<LorryHireMasterLLPModel> GetChallanLorryhireDetailsLLP(ReportRequestModel request);

    }
}
