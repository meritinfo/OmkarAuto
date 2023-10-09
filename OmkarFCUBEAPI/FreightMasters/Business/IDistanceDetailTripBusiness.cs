using FreightMasters.Models;


namespace FreightMasters.Business
{
    public interface IDistanceDetailTripBusiness
    {
        Task<ResponseModel> DistanceDetailTripSave(DistanceDetailTripModel distanceDetailTripModel);
    }
}
