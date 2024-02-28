using FreightMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FreightMasters.Business
{
    public interface IDistanceMasterTripBusiness
    {
        Task<ResponseModel> DistanceMasterTripSave(DistanceMasterTripModel distanceMasterTripModel);
       Task<DistanceMasterTripList> GetDistanceMasterTripList(PageRequestDtBrVh request);
        Task<ResponseModel> ChkdistanceTripValidity(DistanceMasterTripModel distanceMasterTripModel);
        Task<DistanceMasterTripModel> GetFreightTripInnerGridList(RequestModel request);
        Task<ResponseModel> DistanceMasterTripDelete(RequestModel requestModel);
        Task<ResponseModel> DistanceDetailTripSave(DistanceDetailTripModel distanceDetailTripModel);
        Task<List<DropDownListModel>> GetDistanceTripFromLocationList();
        Task<DistanceTripEditModel> GetDistanceTripDtls(RequestModel request);
        Task<DistanceTripEditModel> GetDistanceTripEditDetails(DistanceTripEditModel distanceFrtEdit);
        Task<ResponseModel> DistanceTripEditDetailsSave(DistanceTripEditModel distanceFrtEdit);

    }
}
