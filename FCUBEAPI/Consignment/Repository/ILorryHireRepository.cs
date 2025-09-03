using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface ILorryHireRepository
    {
        Task<LorryHireListModel> GetLorryHirePaymentList(ReportRequestModel request);
        Task<LorryHireMasterModel> GetLorryHireInnerGrid(RequestModel request);
        Task<ResponseModel> ChkLHPMBrokerDisputeDetails(ReportRequestModel request);
        Task<ResponseModel> LorryHireMasterSave(LorryHireMasterModel lorryHire);
        Task<ResponseModel> LorryHireMasterDelete(RequestModel requestModel);
        Task<ResponseModel> DirectPmtRev(RequestModel requestModel);
        Task<LorryHireMasterModel> GetChallanLorryhireDetails(ReportRequestModel request);
        Task<ResponseModel> GetLorryHirePmtNo(RequestModel requestModel);
        Task<ResponseModel> CheckChallanNoExists(RequestModel requestModel);
        Task<ResponseModel> GetLorryHirePrintPdf(RequestModel request);
    }
}
