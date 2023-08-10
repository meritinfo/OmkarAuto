using FleetTrans.Business;
using FleetTrans.Models;
using FleetTrans.Repository;

namespace FleetTrans.Business
{
    public class TripMasterBusiness :ITripMasterBusiness
    {
        readonly ITripMasterRepository tripMasterRepository;
        public TripMasterBusiness(ITripMasterRepository _tripMasterRepository)
        {
            tripMasterRepository = _tripMasterRepository;
        }

        /// <summary>
        /// Business method for save Branch master details
        /// </summary>
        /// <param name="BranchMasterModel"></param>
        public async Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel)
        {
            return await tripMasterRepository.TripMasterSave(tripMasterModel);
        }
        public async Task<TripSheetList> GetTripSheetList(TripSheetListRequest request)
        {
            return await tripMasterRepository.GetTripSheetList(request);
        }
    }
}
