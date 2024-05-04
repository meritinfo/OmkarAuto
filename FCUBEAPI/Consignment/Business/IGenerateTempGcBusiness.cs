using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IGenerateTempGcBusiness
    {
        Task<TempGcListModel> GetTempgcList(ReportRequestModel request);
        Task<TempGcModel> GetTempgcInnerGridList(RequestModel request);
        Task<ResponseModel> TempgcSave(TempGcModel tempgc);
        Task<ResponseModel> TempGcDelete(RequestModel requestModel);
    }

}
