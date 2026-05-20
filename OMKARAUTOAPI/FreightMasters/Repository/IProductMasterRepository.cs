using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    /// <summary>
    /// Product Master service interface methods
    /// </summary>
    public interface IProductMasterRepository
    {
        Task<ResponseModel> ProductMasterSave(ProductMasterModel productMasterModel);
        Task<List<DropDownListModel>> GetProductGroupList();
        Task<ProductMasterList> GetProductMasterList(PageRequest request);
        Task<ResponseModel> ProductMasterDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateProduct(RequestModel requestModel);
    }
}