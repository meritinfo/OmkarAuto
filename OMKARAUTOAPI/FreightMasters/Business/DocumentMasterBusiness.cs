using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public class DocumentMasterBusiness: IDocumentMasterBusiness
    {
        readonly IDocumentMasterRepository documentMasterRepository;
        public DocumentMasterBusiness(IDocumentMasterRepository _documentMasterRepository)
        {
            documentMasterRepository = _documentMasterRepository;
        }

        /// <summary>
        /// Business method for save product group master details
        /// </summary>
        /// <param name="productGroupMasterModel"></param>
        /// 
        public async Task<ResponseModel> DocumentMasterSave(DocumentMasterModel documentMasterModel)
        {
            return await documentMasterRepository.DocumentMasterSave(documentMasterModel);
        }
        public async Task<ResponseModel> DocumentMasterDelete(RequestModel requestModel)
        {
            return await documentMasterRepository.DocumentMasterDelete(requestModel);
        }
        public async Task<DocumentMasterList> GetDocumentMasterList(PageRequest request)
        {
            return await documentMasterRepository.GetDocumentMasterList(request);
        }

}
}
