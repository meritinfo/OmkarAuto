using FreightMasters.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IProductGroupMasterBusiness
    {
        Task<ResponseModel> ProductGroupMasterDetailsSave(ProductGroupMasterModel productGroupMasterModel);
        Task<ProductGroupMasterList> GetProductGroupMasterList(ProductGroupMasterListRequest request);
    }
}
