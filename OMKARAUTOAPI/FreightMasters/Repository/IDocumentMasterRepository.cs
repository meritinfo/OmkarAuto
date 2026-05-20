using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IDocumentMasterRepository
    {
        Task<ResponseModel> DocumentMasterSave(DocumentMasterModel documentMasterModel);
        Task<ResponseModel> DocumentMasterDelete(RequestModel requestModel);
        Task<DocumentMasterList> GetDocumentMasterList(PageRequest request);

    }
}
