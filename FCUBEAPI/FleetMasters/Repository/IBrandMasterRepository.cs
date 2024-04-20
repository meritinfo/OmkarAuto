using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Repository
{
    public interface IBrandMasterRepository
    {
        Task<ResponseModel> BrandMasterSave(BrandMasterModel brandMasterModel);
        Task<BrandMasterList> GetBrandMasterList(PageRequest request);
    }
}
