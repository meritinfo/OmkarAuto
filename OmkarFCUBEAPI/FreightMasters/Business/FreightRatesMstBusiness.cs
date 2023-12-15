using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

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
        public async Task<FreightRatesMstList> GetFreightRatesList(PageRequest request)
        {
            return await freightRatesMstRepository.GetFreightRatesList(request);
        }
        public async Task<ResponseModel> FreightRatesMasterDetailsDelete(Request req)
        {
            return await freightRatesMstRepository.FreightRatesMasterDetailsDelete(req);
        }
        public async Task<FreightRatesMstModel> GetFreightRateInnerGridList(Request req)
        {
            return await freightRatesMstRepository.GetFreightRateInnerGridList(req);
        }

    }
}
