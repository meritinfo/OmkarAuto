
using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public interface IDistanceMasterTripRepository
    {
        Task<ResponseModel> DistanceMasterTripSave(DistanceMasterTripModel DistanceMasterTripModel);
        Task<DistanceMasterTripList> GetDistanceMasterTripList(PageRequestDtBrVh request);
        Task<ResponseModel> DistanceMasterTripDelete(Request requestModel);
        Task<ResponseModel> ChkdistanceTripValidity(DistanceMasterTripModel DistanceMasterTripModel);
        Task<DistanceMasterTripModel> GetFreightTripInnerGridList(FreightTripInnerGridListRequest request);
    }
}

