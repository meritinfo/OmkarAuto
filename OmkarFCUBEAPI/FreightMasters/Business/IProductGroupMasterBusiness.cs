using FreightMasters.Models;

namespace FreightMasters.Business
{
    public interface IProductGroupMasterBusiness
    {
        Task<ResponseModel> ProductGroupMasterDetailsSave(ProductGroupMasterModel ProductGroupMasterModel);
    }
}
