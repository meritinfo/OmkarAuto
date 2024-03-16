using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface ITripMasterBusiness
    {
        Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel);
        Task<TripSheetList> GetTripSheetList(PageRequestDtBrVh request);
        Task<List<DropDownListModel>> GetDriverList();
        Task<ResponseModel>GetOpeningBal(OpBalModel request);
        Task<ResponseModel> GetDslOpeningBal(OpBalModel request);
        Task<ResponseModel> GetAdblueOpeningBal(OpBalModel request);
        Task<ResponseModel> GetIncentiveRate(IncentiveRateModel request);
        Task<ResponseModel> GetPenaltyRate(PenaltyRateModel request);
        Task<PenaltyModel> GetPenaltyRateNew(PenaltyRateModel request);
        Task<ResponseModel> GetBhattaRate(BhattaRateModel request);
        Task<TripSheetList> GetOtherTripOpenList(PageFromDtToDtRequest request);
        Task<ResponseModel> OtherTripOpenSave(TripMasterModel tripMasterModel);
        Task<ResponseModel> OtherTripOpenDelete(RequestModel request);
        Task<ResponseModel> GetNextTripNo(OpBalModel tripNoFilter);
        Task<DriverDetailModel> GetDriverDetail(DriverRequestModel request);
        Task<UserTripRightsModel> GetUserDetails(RequestModel request);
        Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList(TripSheetInnerGridListRequest request);
    }
}
