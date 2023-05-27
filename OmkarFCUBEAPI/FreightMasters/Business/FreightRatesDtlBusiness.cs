using FreightMasters.Models;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    public class FreightRatesDtlBusiness : IFreightRatesDtlBusiness
    {
        readonly IFreightRatesDtlRepository freightRatesDtlRepository;
        public FreightRatesDtlBusiness(IFreightRatesDtlRepository _freightRatesDtlRepository)
        {
            freightRatesDtlRepository = _freightRatesDtlRepository;
        }

        /// <summary>
        /// Business method for save FreightRatesDtl details
        /// </summary>
        /// <param name="FreightRatesDtlModel"></param>
        public async Task<ResponseModel> FreightRatesDtlSave(FreightRatesDtlModel freightRatesDtlModel)
        {
            return await freightRatesDtlRepository.FreightRatesDtlSave(freightRatesDtlModel);
        }
    }
}
