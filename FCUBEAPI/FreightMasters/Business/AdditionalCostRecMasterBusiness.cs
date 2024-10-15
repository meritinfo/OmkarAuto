using DocumentFormat.OpenXml.Office2016.Excel;
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
    public class AdditionalCostRecMasterBusiness : IAdditionalCostRecMasterBusiness
    {

        readonly IAdditionalCostRecMasterRepository additionalCostRecMasterRepository;
        public AdditionalCostRecMasterBusiness(IAdditionalCostRecMasterRepository _additionalCostRecMasterRepository)
        {
            additionalCostRecMasterRepository = _additionalCostRecMasterRepository;
        }
        public async Task<AdditionalCostRecMasterList> GetAdditionalCostRecMasterList(PageRequest request)
        {
            return await additionalCostRecMasterRepository.GetAdditionalCostRecMasterList(request);
        }
        public async Task<ResponseModel> AdditionalCostRecMasterSave(AdditionalCostRecMasterModel additionalCostRecMasterModel)
        {
            return await additionalCostRecMasterRepository.AdditionalCostRecMasterSave(additionalCostRecMasterModel);
        }
        public async Task<ResponseModel> GetAdditionalCostRecDelete(RequestModel requestModel)
        {
            return await additionalCostRecMasterRepository.GetAdditionalCostRecDelete(requestModel);
        }


    }
}
