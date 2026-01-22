using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface IChallanMasterLLPBusiness
    {

        Task<ChallanListModelLLP> GetChallanMasterListLLP(ReportRequestModel request);
        Task<ChallanMasterModelLLP> GetChallanInnerGridListLLP(RequestModel request);
        Task<ResponseModel> ChallanMasterSaveLLP(ChallanMasterModelLLP challanModel);
        Task<ResponseModel> ChallanMasterDeleteLLP(RequestModel requestModel);
        Task<ResponseModel> GetChallanPrintPdfLLP(RequestModel request);
        Task<CciInvoiceDtlModel> GetCCIInviceDetailLLP(RequestModel requestModel);
        Task<ResponseModel> ChkPanDeclaration(RequestModel requestModel);
        Task<ChallanMasterModelLLP> GetBrokerPanDetails(RequestModel request);
    }
}
