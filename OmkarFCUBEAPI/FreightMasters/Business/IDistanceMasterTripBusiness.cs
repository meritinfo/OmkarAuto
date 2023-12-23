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
       Task<DistanceMasterTripList> GetDistanceMasterTripList(PageRequest request);
        Task<ResponseModel> ChkdistanceTripValidity(DistanceMasterTripModel distanceMasterTripModel);
        Task<DistanceMasterTripModel> GetFreightTripInnerGridList(FreightTripInnerGridListRequest request);
        Task<ResponseModel> DistanceMasterTripDelete(Request requestModel);

    }
}
