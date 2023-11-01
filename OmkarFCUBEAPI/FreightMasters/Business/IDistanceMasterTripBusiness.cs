using FreightMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IDistanceMasterTripBusiness
    {
        Task<ResponseModel> DistanceMasterTripSave(DistanceMasterTripModel distanceMasterTripModel);
       Task<DistanceMasterTripList> GetDistanceMasterTripList(DistanceMasterTripListRequest request);
        Task<DistanceMasterTripModel> GetFreightTripInnerGridList(FreightTripInnerGridListRequest request);

    }
}
