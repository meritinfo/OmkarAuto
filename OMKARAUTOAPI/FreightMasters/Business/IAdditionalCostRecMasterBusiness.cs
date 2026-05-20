using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IAdditionalCostRecMasterBusiness
    {
        Task<ResponseModel> AdditionalCostRecMasterSave(AdditionalCostRecMasterModel additionalCostRecMasterModel);
        Task<AdditionalCostRecMasterList> GetAdditionalCostRecMasterList(PageRequest request);
        Task<ResponseModel> GetAdditionalCostRecDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateAddCostDescription(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateAddCostCode(RequestModel requestModel);
    }


}
