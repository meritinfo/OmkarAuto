using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public interface ITripExpTypeBusiness
    {
        Task<ResponseModel> TripExpTypeMasterSave(TripExpTypeMasterModel tripExpTypeMasterModel);
        Task<ResponseModel> CheckDuplicateTripExpType(RequestModel requestModel);
        Task<ResponseModel> TripExpTypeMasterDelete(RequestModel requestModel);
        Task<TripExpTypeMasterList> GetTripExpTypeMasterList(ReportRequestModel request);
    }
}
