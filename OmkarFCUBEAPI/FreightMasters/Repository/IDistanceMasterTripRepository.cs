
using FreightMasters.Models;

namespace FreightMasters.Repository
{
    public interface IDistanceMasterTripRepository
    {
        Task<ResponseModel> DistanceMasterTripSave(DistanceMasterTripModel DistanceMasterTripModel);
        Task<DistanceMasterTripList> GetDistanceMasterTripList(DistanceMasterTripListRequest request);
        Task<DistanceMasterTripModel> GetFreightTripInnerGridList(FreightTripInnerGridListRequest request);
    }
}

