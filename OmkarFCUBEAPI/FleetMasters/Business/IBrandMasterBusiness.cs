using FleetMasters.Models;
namespace FleetMasters.Business
{
    public interface IBrandMasterBusiness
    {
        Task<ResponseModel> BrandMasterSave(BrandMasterModel BrandMasterModel);
    }
}
