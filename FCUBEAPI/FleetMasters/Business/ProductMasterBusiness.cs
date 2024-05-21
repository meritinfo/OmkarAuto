//using FleetMasters.Models;
//using FleetMasters.Repository;
//using Shared.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace FleetMasters.Business
//{
//    public class ProductMasterBusiness: IProductMasterBusiness
//    {
//        readonly IProductMasterRepository productMasterRepository;
//        public ProductMasterBusiness(IProductMasterRepository _productMasterRepository)
//        {
//            productMasterRepository = _productMasterRepository;
//        }

//        /// <summary>
//        /// Business method for save vehicle type group master details
//        /// </summary>
//        /// <param name="vehicleTypeGroupMasterModel"></param>
//        /// 
//        public async Task<ResponseModel> ProductMasterSave(ProductMasterModel productMasterModel)
//        {
//            return await productMasterRepository.ProductMasterSave(productMasterModel);
//        }
//        public async Task<ProductMasterList> GetProductMasterList(PageRequest request)
//        {
//            return await productMasterRepository.GetProductMasterList(request);
//        }
//    }
//}
