using FreightMasters.Models;
using FreightMasters.Repository;

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
    }
}
