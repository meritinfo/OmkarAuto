using FreightMasters.Models;

namespace FreightMasters.Repository
{
    /// <summary>
    /// Product group Master service interface methods
    /// </summary>
    public interface IProductGroupMasterRepository
    {
        Task<ResponseModel> ProductGroupMasterDetailsSave(ProductGroupMasterModel productGroupMasterModel);
    }
}
