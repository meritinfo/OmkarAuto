using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface ITripMasterBusiness
    {
        Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel);
        Task<TripSheetList> GetTripSheetList(TripSheetListRequest request);
        Task<List<DropDownListModel>> GetDriverList();
        Task<ResponseModel>GetOpeningBal(OpBalModel request);
        Task<ResponseModel> GetIncentiveRate(IncentiveRateModel request);
        Task<ResponseModel> GetPenaltyRate(PenaltyRateModel request);
        Task<ResponseModel> GetBhattaRate(BhattaRateModel request);
        Task<TripSheetList> GetOtherTripOpenList(PageFromDtToDtRequest request);
        Task<ResponseModel> OtherTripOpenSave(TripMasterModel tripMasterModel);
        Task<ResponseModel> OtherTripOpenDelete(Request request);
        Task<ResponseModel> GetNextTripNo(OpBalModel tripNoFilter);
        Task<DriverDetailModel> GetDriverDetail(DriverRequestModel request);
        Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList(TripSheetInnerGridListRequest request);
    }
}
