using AdminMasters.Models;
using AdminMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminMasters.Business
{
    public class PtSlabMasterBusiness : IPtSlabMasterBusiness
    {
        readonly IPtSlabmasterRepository ptSlabmasterRepository;
        public PtSlabMasterBusiness(IPtSlabmasterRepository _ptSlabMasterRepository)
        {
            ptSlabmasterRepository = _ptSlabMasterRepository;
        }

        /// <summary>
        /// Business method for save role master details
        /// </summary>
        /// <param name="roleMasterModel"></param>
        public async Task<ResponseModel> PtSlabMasterSave(PtSlabMasterModel ptSlabMasterModel)
        {
            return await ptSlabmasterRepository.PtSlabMasterSave(ptSlabMasterModel);
        }
        public async Task<PtSlabList> GetPtSlabMasterList(PageRequest request)
        {
            return await ptSlabmasterRepository.GetPtSlabMasterList(request);
        }
    }
}
