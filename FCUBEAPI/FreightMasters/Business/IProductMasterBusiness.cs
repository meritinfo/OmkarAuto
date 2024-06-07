using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IProductMasterBusiness
    {
        Task<ResponseModel> ProductMasterSave(ProductMasterModel productMasterModel);
        Task<List<DropDownListModel>> GetProductGroupList();
        Task<ProductMasterList> GetProductMasterList(PageRequest request);
        Task<ResponseModel> ProductMasterDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateProduct(RequestModel requestModel);
    }
}
