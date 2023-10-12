using FreightMasters.Models;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    public class FreightRatesMstBusiness : IFreightRatesMstBusiness
    {
        readonly IFreightRatesMstRepository freightRatesMstRepository;
        public FreightRatesMstBusiness(IFreightRatesMstRepository _freightRatesMstRepository)
        {
            freightRatesMstRepository = _freightRatesMstRepository;
        }

        /// <summary>
        /// Business method for save product group master details
        /// </summary>
        /// <param name="productGroupMasterModel"></param>
        public async Task<ResponseModel> FreightRatesMstSave(FreightRatesMstModel freightRatesMstModel)
        {
            return await freightRatesMstRepository.FreightRatesMstSave(freightRatesMstModel);
        }
        public async Task<FreightRatesMstList> GetFreightRatesList(FreightRatesListRequest request)
        {
            return await freightRatesMstRepository.GetFreightRatesList(request);
        }
    }
}
