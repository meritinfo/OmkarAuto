using FreightMasters.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IProductMasterBusiness
    {
        Task<ResponseModel> ProductMasterSave(ProductMasterModel productMasterModel);
    }
}
