using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface ILorryHireBusiness
    {
        Task<LorryHireListModel> GetLorryHirePaymentList(ReportRequestModel request);
        Task<LorryHireMasterModel> GetLorryHireInnerGrid(RequestModel request);
        Task<ResponseModel> LorryHireMasterSave(LorryHireMasterModel lorryHire);
        Task<ResponseModel> ChkLHPMBrokerDisputeDetails(ReportRequestModel request);
        Task<ResponseModel> LorryHireMasterDelete(RequestModel requestModel);
        Task<LorryHireMasterModel> GetChallanLorryhireDetails(ReportRequestModel request);
        Task<ResponseModel> GetLorryHirePmtNo(RequestModel requestModel);
        Task<ResponseModel> CheckChallanNoExists(RequestModel requestModel);
        Task<ResponseModel> GetLorryHirePrintPdf(RequestModel request);
    }

}
