

using FreightMasters.Models;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    public class DistanceDetailTripBusiness : IDistanceDetailTripBusiness
    {
        readonly IDistanceDetailTripRepository distanceDetailTripRepository;
        public DistanceDetailTripBusiness(IDistanceDetailTripRepository _distanceDetailTripRepository)
        {
            distanceDetailTripRepository = _distanceDetailTripRepository;
        }

        /// <summary>
        /// Business method for save DistanceDetailTrip details
        /// </summary>
        /// <param name="DistanceDetailTripModel"></param>
        public async Task<ResponseModel> DistanceDetailTripSave(DistanceDetailTripModel distanceDetailTripModel)
        {
            return await distanceDetailTripRepository.DistanceDetailTripSave(distanceDetailTripModel);
        }
    }
}

