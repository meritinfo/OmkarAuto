using FleetMasters.Models;

namespace FleetMasters.Repository
{
    public interface IBrandMasterRepository
    {
        Task<ResponseModel> BrandMasterSave(BrandMasterModel brandMasterModel);
        Task<BrandMasterList> GetBrandMasterList(BrandMasterListRequest request);
    }
}
