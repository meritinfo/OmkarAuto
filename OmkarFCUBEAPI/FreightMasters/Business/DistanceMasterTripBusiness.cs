

using FreightMasters.Models;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    public class DistanceMasterTripBusiness : IDistanceMasterTripBusiness
    {
        readonly IDistanceMasterTripRepository distanceMasterTripRepository;
        public DistanceMasterTripBusiness(IDistanceMasterTripRepository _distanceMasterTripRepository)
        {
            distanceMasterTripRepository = _distanceMasterTripRepository;
        }

        /// <summary>
        /// Business method for save FreightRatesDtl details
        /// </summary>
        /// <param name="FreightRatesDtlModel"></param>
        public async Task<ResponseModel> DistanceMasterTripSave(DistanceMasterTripModel distanceMasterTripModel)
        {
            return await distanceMasterTripRepository.DistanceMasterTripSave(distanceMasterTripModel);
        }
        public async Task<DistanceMasterTripList> GetDistanceMasterTripList(DistanceMasterTripListRequest request)


        {
            return await distanceMasterTripRepository.GetDistanceMasterTripList(request);
        }
        public async Task<DistanceMasterTripModel> GetFreightTripInnerGridList(FreightTripInnerGridListRequest request)
        {
            return await distanceMasterTripRepository.GetFreightTripInnerGridList(request);
        }
    }
}

