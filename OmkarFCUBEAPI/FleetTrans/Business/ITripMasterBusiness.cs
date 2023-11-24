using FleetTrans.Models;

namespace FleetTrans.Business
{
    public interface ITripMasterBusiness
    {
        Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel);
        Task<TripSheetList> GetTripSheetList(TripSheetListRequest request);
        Task<List<BranchListModel>> GetDriverList();
        Task<ResponseModel>GetOpeningBal(OpBalModel request);
        Task<ResponseModel> GetIncentiveRate(IncentiveRateModel request);
        Task<ResponseModel> GetPenaltyRate(PenaltyRateModel request);
        Task<ResponseModel> GetBhattaRate(BhattaRateModel request);
        Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList(TripSheetInnerGridListRequest request);
    }
}
