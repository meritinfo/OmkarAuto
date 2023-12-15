
using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public interface IDistanceMasterTripRepository
    {
        Task<ResponseModel> DistanceMasterTripSave(DistanceMasterTripModel DistanceMasterTripModel);
        Task<DistanceMasterTripList> GetDistanceMasterTripList(PageRequest request);
        Task<DistanceMasterTripModel> GetFreightTripInnerGridList(FreightTripInnerGridListRequest request);
    }
}

