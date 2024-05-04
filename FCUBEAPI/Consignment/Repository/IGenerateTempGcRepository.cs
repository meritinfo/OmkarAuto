using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IGenerateTempGcRepository
    {
        Task<TempGcListModel> GetTempgcList(ReportRequestModel request);
        Task<TempGcModel> GetTempgcInnerGridList(RequestModel request);
        Task<ResponseModel> TempgcSave(TempGcModel tempgc);
        Task<ResponseModel> TempGcDelete(RequestModel requestModel);
    }
}
