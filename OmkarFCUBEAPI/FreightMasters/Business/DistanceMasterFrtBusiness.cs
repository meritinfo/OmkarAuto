

using FreightMasters.Models;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    public class DistanceMasterFrtBusiness : IDistanceMasterFrtBusiness
    {
        readonly IDistanceMasterFrtRepository distanceMasterFrtRepository;
        public DistanceMasterFrtBusiness(IDistanceMasterFrtRepository _distanceMasterFrtRepository)
        {
            distanceMasterFrtRepository = _distanceMasterFrtRepository;
        }

        /// <summary>
        /// Business method for save FreightRatesDtl details
        /// </summary>
        /// <param name="FreightRatesDtlModel"></param>
        public async Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel distanceMasterFrtModel)
        {
            return await distanceMasterFrtRepository.DistanceMasterFrtSave(distanceMasterFrtModel);
        }
        public async Task<DistanceMasterFrtList> GetDistanceMasterFrtList(DistanceMasterFreightListRequest request)
        {
            return await distanceMasterFrtRepository.GetDistanceMasterFrtList(request);
        }
    }
}

