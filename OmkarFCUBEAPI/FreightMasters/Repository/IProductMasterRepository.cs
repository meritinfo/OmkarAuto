using FreightMasters.Models;

namespace FreightMasters.Repository
{
    /// <summary>
    /// Product Master service interface methods
    /// </summary>
    public interface IProductMasterRepository
    {
        Task<ResponseModel> ProductMasterSave(ProductMasterModel productMasterModel);
    }
}