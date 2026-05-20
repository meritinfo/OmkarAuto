using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface IGenerateTempGcBusiness
    {
        Task<TempGcListModel> GetTempgcList(RepReqModel request);
        Task<TempGcModel> GetTempgcInnerGridList(RequestModel request);
        Task<ResponseModel> TempgcSave(TempGcModel tempgc);
        Task<ResponseModel> TempGcDelete(RequestModel requestModel);
        Task<ResponseModel> SendLRMail(ReportRequestModel request);
        Task<ResponseModel> GetLRPdf(ReportRequestModel request);
        Task<ConsignmentModel> GetCnorCneeDetails(RequestModel request);
    }

}
