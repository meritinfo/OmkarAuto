

using FreightMasters.Models;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    public class DistanceDetailFrtBusiness : IDistanceDetailFrtBusiness
    {
        readonly IDistanceDetailFrtRepository distanceDetailFrtRepository;
        public DistanceDetailFrtBusiness(IDistanceDetailFrtRepository _distanceDetailFrtRepository)
        {
            distanceDetailFrtRepository = _distanceDetailFrtRepository;
        }

        /// <summary>
        /// Business method for save FreightRatesDtl details
        /// </summary>
        /// <param name="FreightRatesDtlModel"></param>
        public async Task<ResponseModel> DistanceDetailFrtSave(DistanceDetailFrtModel distanceDetailFrtModel)
        {
            return await distanceDetailFrtRepository.DistanceDetailFrtSave(distanceDetailFrtModel);
        }
    }
}

