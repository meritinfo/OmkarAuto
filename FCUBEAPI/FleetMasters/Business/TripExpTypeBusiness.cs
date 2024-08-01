using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public class TripExpTypeBusiness: ITripExpTypeBusiness
    {
        readonly ITripExpTypeRepository tripExpTypeRepository;
        public TripExpTypeBusiness(ITripExpTypeRepository _tripExpTypeRepository)
        {
            tripExpTypeRepository = _tripExpTypeRepository;
        }
        public async Task<ResponseModel> TripExpTypeMasterSave(TripExpTypeMasterModel tripExpTypeMasterModel)
        {
            return await tripExpTypeRepository.TripExpTypeMasterSave(tripExpTypeMasterModel);
        }
        public async Task<TripExpTypeMasterList> GetTripExpTypeMasterList(ReportRequestModel request)
        {
            return await tripExpTypeRepository.GetTripExpTypeMasterList(request);
        }
        public async Task<ResponseModel> TripExpTypeMasterDelete(RequestModel requestModel)
        {
            return await tripExpTypeRepository.TripExpTypeMasterDelete(requestModel);
        }
        public async Task<ResponseModel> CheckDuplicateTripExpType(RequestModel requestModel)
        {
            return await tripExpTypeRepository.CheckDuplicateTripExpType(requestModel);
        }
    }
}
