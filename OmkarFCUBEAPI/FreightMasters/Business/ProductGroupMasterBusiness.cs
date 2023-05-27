using FreightMasters.Models;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    public class ProductGroupMasterBusiness : IProductGroupMasterBusiness
    {
        readonly IProductGroupMasterRepository productGroupMasterRepository;
        public ProductGroupMasterBusiness(IProductGroupMasterRepository _productGroupMasterRepository)
        {
            productGroupMasterRepository = _productGroupMasterRepository;
        }

        /// <summary>
        /// Business method for save product group master details
        /// </summary>
        /// <param name="productGroupMasterModel"></param>
        public async Task<ResponseModel> ProductGroupMasterDetailsSave(ProductGroupMasterModel productGroupMasterModel)
        {
            return await productGroupMasterRepository.ProductGroupMasterDetailsSave(productGroupMasterModel);
        }
        public async Task<ProductGroupMasterList> GetProductGroupMasterList(ProductGroupMasterListRequest request)
        {
            return await productGroupMasterRepository.GetProductGroupMasterList(request);
        }
    }
}
