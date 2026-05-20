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
    public class LhpmSlabMasterBusiness: ILhpmSlabMasterBusiness
    {
        readonly ILhpmSlabMasterRepository lhpmSlabMasterRepository;
        public LhpmSlabMasterBusiness(ILhpmSlabMasterRepository _lhpmSlabMasterRepository)
        {
            lhpmSlabMasterRepository = _lhpmSlabMasterRepository;
        }
        public async Task<ResponseModel> LhpmSlabMasterSave(LhpmSlabMasterModel lhpmSlabMasterModel)
        {
            return await lhpmSlabMasterRepository.LhpmSlabMasterSave(lhpmSlabMasterModel);
        }
        public async Task<LhpmSlabMasterList> GetLhpmSlabMasterList(PageRequest request)
        {
            return await lhpmSlabMasterRepository.GetLhpmSlabMasterList(request);
        }
        public async Task<ResponseModel> LhpmSlabMasterDelete(RequestModel requestModel)
        {
            return await lhpmSlabMasterRepository.LhpmSlabMasterDelete(requestModel);
        }

    }
}
