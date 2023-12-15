using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

namespace FreightMasters.Business
{
    public class ProductMasterBusiness : IProductMasterBusiness
    {
        readonly IProductMasterRepository productMasterRepository;
        public ProductMasterBusiness(IProductMasterRepository _productMasterRepository)
        {
            productMasterRepository = _productMasterRepository;
        }

        /// <summary>
        /// Business method for save product master details
        /// </summary>
        /// <param name="productMasterModel"></param>
        public async Task<ResponseModel> ProductMasterSave(ProductMasterModel productMasterModel)
        {
            return await productMasterRepository.ProductMasterSave(productMasterModel);
        }
        public async Task<List<DropDownListModel>> GetProductGroupList()
        {
            return await productMasterRepository.GetProductGroupList();

        }
        public async Task<ProductMasterList> GetProductMasterList(PageRequest request)
        {
            return await productMasterRepository.GetProductMasterList(request);
        }
    }
}
