using FreightMasters.Models;
using Shared.Models;


namespace FreightMasters.Business
{
    public interface IDistanceDetailTripBusiness
    {
        Task<ResponseModel> DistanceDetailTripSave(DistanceDetailTripModel distanceDetailTripModel);
    }
}
