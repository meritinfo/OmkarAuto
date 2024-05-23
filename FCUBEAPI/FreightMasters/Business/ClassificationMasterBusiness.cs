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
    public class ClassificationMasterBusiness: IClassificationMasterBusiness
    {
        readonly IClassificationMasterRepository classificationMasterRepository;
        public ClassificationMasterBusiness(IClassificationMasterRepository _classificationMasterRepository)
        {
            classificationMasterRepository = _classificationMasterRepository;
        }

        public async Task<ResponseModel> ClassificationMasterSave(ClassificationMasterModel classificationMasterModel)
        {
            return await classificationMasterRepository.ClassificationMasterSave(classificationMasterModel);
        }       
        public async Task<ClassificationMasterList> GetClassificationMasterList(PageRequest request)
        {
            return await classificationMasterRepository.GetClassificationMasterList(request);
        }
        public async Task<ResponseModel> ClassificationMasterDelete(RequestModel request)
        {
            return await classificationMasterRepository.ClassificationMasterDelete(request);
        }

    }
}
