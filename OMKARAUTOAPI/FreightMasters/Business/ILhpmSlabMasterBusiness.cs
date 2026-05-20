using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface ILhpmSlabMasterBusiness
    {
        Task<LhpmSlabMasterList> GetLhpmSlabMasterList(PageRequest request);
        Task<ResponseModel> LhpmSlabMasterSave(LhpmSlabMasterModel lhpmSlabMasterModel);
        Task<ResponseModel> LhpmSlabMasterDelete(RequestModel requestModel);


    }
}
