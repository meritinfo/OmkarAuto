using FleetMasters.Models;
using FleetMasters.Repository;

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
        public async Task<BrandMasterList> GetBrandMasterList(BrandMasterListRequest request)
        {
            return await brandMasterRepository.GetBrandMasterList(request);
        }
    }
}
