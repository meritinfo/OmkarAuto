
using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public interface IDistanceMasterTripRepository
    {
        Task<ResponseModel> DistanceMasterTripSave(DistanceMasterTripModel DistanceMasterTripModel);
        Task<DistanceMasterTripList> GetDistanceMasterTripList(PageRequestDtBrVh request);
        Task<ResponseModel> DistanceMasterTripDelete(RequestModel requestModel);
        Task<ResponseModel> ChkdistanceTripValidity(DistanceMasterTripModel DistanceMasterTripModel);
        Task<DistanceMasterTripModel> GetFreightTripInnerGridList(RequestModel request);
        Task<List<DropDownListModel>> GetDistanceTripFromLocationList();
        Task<DistanceTripEditModel> GetDistanceTripDtls(RequestModel request);   
        Task<DistanceTripEditModel> GetDistanceTripEditDetails(DistanceTripEditModel distanceTripEdit);
        Task<ResponseModel> DistanceTripEditDetailsSave(DistanceTripEditModel distanceTripEdit);

    }
}

