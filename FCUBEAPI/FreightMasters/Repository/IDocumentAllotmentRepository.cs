using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    /// <summary>
    /// Product Master service interface methods
    /// </summary>
    public interface IDocumentAllotmentRepository
    {
        Task<ResponseModel> DocumentallotmentSave(DocumentAllotmentModel documentAllotmentModel);
        Task<DocumentAllotmentListModel> GetDocumentAllotmentList(PageRequest request);
        Task<ResponseModel> DocumentAllotmentDelete(RequestModel requestModel);
        Task<ResponseModel> GetDocNumCode(RequestModel requestModel);
        Task<ResponseModel> CheckDocumentRange(ReportRequestModel req);
        Task<List<DropDownListModel>> GetRangeList(RequestModel req);
        Task<List<DropDownListModel>> GetSeriesllpList(RequestModel req);
    }
}