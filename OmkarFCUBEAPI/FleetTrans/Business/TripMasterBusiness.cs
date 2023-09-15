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
        public async Task<ResponseModel> GetOpeningBal(OpBalModel request)
        {
            return await tripMasterRepository.GetOpeningBal(request);
        }
        public async Task<ResponseModel> GetIncentiveRate(IncentiveRateModel request)
        {
            return await tripMasterRepository.GetIncentiveRate(request);
        }
        public async Task<ResponseModel> GetBhattaRate(BhattaRateModel request)
        {
            return await tripMasterRepository.GetBhattaRate(request);
        }
        public async Task<TripSheetList> GetTripSheetList(TripSheetListRequest request)
        {
            return await tripMasterRepository.GetTripSheetList(request);
        }
        public async Task<List<BranchListModel>> GetDriverList()
        {
            return await tripMasterRepository.GetDriverList();
        }
        public async Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList(TripSheetInnerGridListRequest request)
        {
            return await tripMasterRepository.GetTripSheetInnerGridList(request);
        }
    }
}
