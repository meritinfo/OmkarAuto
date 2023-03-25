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
        /// Business method for save destination master details
        /// </summary>
        /// <param name="ProductGroupMasterModel"></param>
        public async Task<ResponseModel> ProductGroupMasterDetailsSave(ProductGroupMasterModel productGroupMasterModel)
        {
            return await productGroupMasterRepository.ProductGroupMasterDetailsSave(productGroupMasterModel);
        }
    }
}
