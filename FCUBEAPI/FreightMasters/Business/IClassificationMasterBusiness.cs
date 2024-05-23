using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IClassificationMasterBusiness
    {
        Task<ResponseModel> ClassificationMasterSave(ClassificationMasterModel classificationMasterModel);

        Task<ClassificationMasterList> GetClassificationMasterList(PageRequest request);
        Task<ResponseModel> ClassificationMasterDelete(RequestModel requestModel);
    }
}
