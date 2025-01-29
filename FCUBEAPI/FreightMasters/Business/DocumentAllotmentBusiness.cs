using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

namespace FreightMasters.Business
{
    public class DocumentAllotmentBusiness : IDocumentAllotmentBusiness
    {
        readonly IDocumentAllotmentRepository documentAllotmentRepository;
        public DocumentAllotmentBusiness(IDocumentAllotmentRepository _documentAllotmentRepository)
        {
            documentAllotmentRepository = _documentAllotmentRepository;
        }

        /// <summary>
        /// Business method for save product group master details
        /// </summary>
        /// <param name="productGroupMasterModel"></param>
        public async Task<ResponseModel>DocumentallotmentSave(DocumentAllotmentModel documentAllotmentModel)
        {
            return await documentAllotmentRepository.DocumentallotmentSave(documentAllotmentModel);
        }
        public async Task<DocumentAllotmentListModel> GetDocumentAllotmentList(PageRequest request)
        {
            return await documentAllotmentRepository.GetDocumentAllotmentList(request);
        }
        public async Task<ResponseModel> DocumentAllotmentDelete(RequestModel requestModel)
{
             return await documentAllotmentRepository.DocumentAllotmentDelete(requestModel);
         }
        public async  Task<ResponseModel> GetDocNumCode(RequestModel requestModel)
        {
            return await documentAllotmentRepository.GetDocNumCode(requestModel);
        }
        public async Task<ResponseModel> CheckDocumentRange(ScheduleModel req)
        {
            return await documentAllotmentRepository.CheckDocumentRange(req);
        }
        public async Task<List<DropDownListModel>> GetRangeList(RequestModel req)
        {
            return await documentAllotmentRepository.GetRangeList(req);
        }
    }
}
