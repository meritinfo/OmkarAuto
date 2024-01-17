using FleetTrans.Business;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

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
        public async Task<ResponseModel> GetDslOpeningBal(OpBalModel request)
        {
            return await tripMasterRepository.GetDslOpeningBal(request);
        }
        public async Task<ResponseModel> GetAdblueOpeningBal(OpBalModel request)
        {
            return await tripMasterRepository.GetAdblueOpeningBal(request);
        }
        public async Task<ResponseModel> GetIncentiveRate(IncentiveRateModel request)
        {
            return await tripMasterRepository.GetIncentiveRate(request);
        }
        public async Task<ResponseModel> GetPenaltyRate(PenaltyRateModel request)
        {
            return await tripMasterRepository.GetPenaltyRate(request);
        }
        public async Task<ResponseModel> GetBhattaRate(BhattaRateModel request)
        {
            return await tripMasterRepository.GetBhattaRate(request);
        }
        public async Task<DriverDetailModel> GetDriverDetail(DriverRequestModel request)
        {
            return await tripMasterRepository.GetDriverDetail(request);
        }
        public async Task<TripSheetList> GetTripSheetList(PageRequestDtBrVh request)
        {
            return await tripMasterRepository.GetTripSheetList(request);
        }
        public async Task<List<DropDownListModel>> GetDriverList()
        {
            return await tripMasterRepository.GetDriverList();
        }
        public async Task<TripSheetList> GetOtherTripOpenList(PageFromDtToDtRequest request)
        {
            return await tripMasterRepository.GetOtherTripOpenList(request);
        }
        public async Task<ResponseModel> OtherTripOpenSave(TripMasterModel tripMasterModel)
        {
            return await tripMasterRepository.OtherTripOpenSave(tripMasterModel);
        }
        public async Task<ResponseModel> OtherTripOpenDelete(RequestModel request)
        {
            return await tripMasterRepository.OtherTripOpenDelete(request);
        }
        public async Task<ResponseModel> GetNextTripNo(OpBalModel tripNoFilter)
        {
            return await tripMasterRepository.GetNextTripNo(tripNoFilter);
        }
        public async Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList(TripSheetInnerGridListRequest request)
        {
            return await tripMasterRepository.GetTripSheetInnerGridList(request);
        }
    }
}
