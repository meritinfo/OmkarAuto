using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Business
{
    public interface IBrandMasterBusiness
    {
        Task<ResponseModel> BrandMasterSave(BrandMasterModel BrandMasterModel);
        Task<BrandMasterList> GetBrandMasterList(PageRequest request);
    }
}
