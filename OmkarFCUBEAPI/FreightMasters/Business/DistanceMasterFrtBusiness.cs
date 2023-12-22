

using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

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
        public async Task<ResponseModel> ChkdistanceFrtValidity(DistanceMasterFrtModel distanceMasterFrtModel)
        {
            return await distanceMasterFrtRepository.ChkdistanceFrtValidity(distanceMasterFrtModel);
        }
        public async Task<DistanceMasterFrtList> GetDistanceMasterFrtList(PageRequest request)
        {
            return await distanceMasterFrtRepository.GetDistanceMasterFrtList(request);
        }
        public async Task<DistanceMasterFrtModel> GetFreightInnerGridList(FreightTripInnerGridListRequest request)
        {
            return await distanceMasterFrtRepository.GetFreightInnerGridList(request);
        }
        public async Task<ResponseModel> DistanceMasterFrtDelete(Request req)
        {
            return await distanceMasterFrtRepository.DistanceMasterFrtDelete(req);
        }
    }
}

