using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;

namespace FleetMasters.Business
{
    public class BrandMasterBusiness : IBrandMasterBusiness
    {
        readonly IBrandMasterRepository brandMasterRepository;
        public BrandMasterBusiness(IBrandMasterRepository _brandMasterRepository)
        {
            brandMasterRepository = _brandMasterRepository;
        }

        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="brandMasterModel"></param>
        public async Task<ResponseModel> BrandMasterSave(BrandMasterModel brandMasterModel)
        {
            return await brandMasterRepository.BrandMasterSave(brandMasterModel);
        }
        public async Task<BrandMasterList> GetBrandMasterList(PageRequest request)
        {
            return await brandMasterRepository.GetBrandMasterList(request);
        }
    }
}
