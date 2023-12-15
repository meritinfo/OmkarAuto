using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public interface IDistanceDetailTripRepository
    {
        Task<ResponseModel> DistanceDetailTripSave(DistanceDetailTripModel distanceDetailTripModel);
    }
}
