using FleetTrans.Models;

namespace FleetTrans.Business
{
    public interface ITripMasterBusiness
    {
        Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel);
        Task<TripSheetList> GetTripSheetList(TripSheetListRequest request);
        Task<List<BranchListModel>> GetDriverList();
        Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList();
    }
}
