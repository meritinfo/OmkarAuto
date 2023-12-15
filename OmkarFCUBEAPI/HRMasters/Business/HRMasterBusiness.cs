using HRMasters.Models;
using HRMasters.Repository;
using Shared.Models;

namespace HRMasters.Business
{
    public class HRMasterBusiness : IHRMasterBusiness
    {
        readonly IHRMasterRepository hrMasterRepository;
        public HRMasterBusiness(IHRMasterRepository _hrMasterRepository)
        {
            hrMasterRepository = _hrMasterRepository;
        }

        /// <summary>
        /// Business method for save product group master details
        /// </summary>
        /// <param name="productGroupMasterModel"></param>
        public async Task<ResponseModel> HRMasterSave(HRMasterModel hrMasterModel)
        {
            return await hrMasterRepository.HRMasterSave(hrMasterModel);
        }
    }
}
