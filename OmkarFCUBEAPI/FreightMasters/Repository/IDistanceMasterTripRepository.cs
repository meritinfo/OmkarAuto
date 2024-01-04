
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
        Task<ResponseModel> DistanceDetailTripSave(DistanceDetailTripModel distanceDetailTripModel);
        Task<List<DropDownListModel>> GetDistanceTripFromLocationList();
        Task<DistanceTripEditModel> GetDistanceTripDtls(Request request);   
        Task<DistanceTripEditModel> GetDistanceTripEditDetails(DistanceTripEditModel distanceTripEdit);
        Task<ResponseModel> DistanceTripEditDetailsSave(DistanceTripEditModel distanceTripEdit);

    }
}

