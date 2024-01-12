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
    public class HrMasterBusiness: IHrMasterBusiness
    {
        readonly IHrMasterRepository hrMasterRepository;
        public HrMasterBusiness(IHrMasterRepository _hrMasterRepository)
        {
            hrMasterRepository = _hrMasterRepository;
        }

        /// <summary>
        /// Business method for save role master details
        /// </summary>
        /// <param name="roleMasterModel"></param>
        public async Task<ResponseModel> HrMasterSave(HrMasterModel hrMasterModel)
        {
            return await hrMasterRepository.HrMasterSave(hrMasterModel);
        }
        public async Task<HrMasterList> GetHrMasterList(PageRequest request)
        {
            return await hrMasterRepository.GetHrMasterList(request);
        }
    }
}
