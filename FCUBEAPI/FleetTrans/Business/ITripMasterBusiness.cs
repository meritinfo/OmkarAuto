using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface ITripMasterBusiness
    {
        Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel);
        Task<TripSheetList> GetTripSheetList(ReportRequestModel request);
        Task<List<DropDownListModel>> GetDriverList();
        Task<ResponseModel>GetOpeningBal(OpBalModel request);
        Task<ResponseModel> GetLastTripDriver(OpBalModel request);
        Task<ResponseModel> GetDslOpeningBal(OpBalModel request);
        Task<ResponseModel> GetDslOpeningBalforPmt(OpBalModel request);
        Task<ResponseModel> GetAdblueOpeningBal(OpBalModel request);
        Task<ResponseModel> GetIncentiveRate(IncentiveRateModel request);
        Task<ResponseModel> GetPenaltyRate(PenaltyRateModel request);
        Task<PenaltyModel> GetPenaltyRateNew(PenaltyRateModel request);
        Task<ResponseModel> GetBhattaRate(BhattaRateModel request);
        Task<TripSheetList> GetOtherTripOpenList(ReportRequestModel request);
        Task<ResponseModel> OtherTripOpenSave(TripMasterModel tripMasterModel);
        Task<ResponseModel> OtherTripOpenDelete(RequestModel request);
        Task<ResponseModel> GetNextTripNo(OpBalModel tripNoFilter);
        Task<DriverDetailModel> GetDriverDetail(RequestModel request);
        Task<UserTripRightsModel> GetUserDetails(RequestModel request);
        Task<ResponseModel> TripMasterDelete(RequestModel requestModel);
       Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList(TripSheetInnerGridListRequest request);
    }
}
