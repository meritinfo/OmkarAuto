using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface ILorryHireLLPRepository
    {
        Task<LorryHireListLLPModel> GetLorryHirePaymentListLLP(ReportRequestModel request);
        Task<ResponseModel> GetLorryHirePaymentExcel(ReportRequestModel request);
        Task<LorryHireMasterLLPModel> GetLorryHireInnerGridLLP(RequestModel request);
        Task<ResponseModel> LorryHireMasterSaveLLP(LorryHireMasterLLPModel lorryHire);
        Task<LorryHireMasterLLPModel> GetChallanLorryhireDetailsLLP(ReportRequestModel request);
        Task<LhpmChallanViewModel> GetLorryHireChallanDetailViewLLP(ReportRequestModel request);

    }
}
