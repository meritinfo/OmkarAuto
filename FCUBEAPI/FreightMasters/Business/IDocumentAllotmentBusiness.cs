using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IDocumentAllotmentBusiness
    {
        Task<ResponseModel> DocumentallotmentSave(DocumentAllotmentModel documentAllotmentModel);
        Task<DocumentAllotmentListModel> GetDocumentAllotmentList(PageRequest request);
        Task<ResponseModel> DocumentAllotmentDelete(RequestModel requestModel);
        Task<ResponseModel> GetDocNumCode(RequestModel requestModel);
        Task<ResponseModel> CheckDocumentRange(ScheduleModel req);
    }
}

