using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface ITripMasterBusiness
    {
        Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel);
        Task<TripSheetList> GetTripSheetList(ReportRequestModel request);
        Task<List<DropDownListModel>> GetDriverList();
        Task<ResponseModel> TripMasterDelete(RequestModel requestModel);
        Task<ResponseModel> GetNextTripNo(RequestModel request);
        Task<TripMasterModel> GetTripSheetInnerSearchList(ReportRequestModel request);
        Task<TripMasterModel> GetTripSheetInnerGridList(RequestModel request);
        Task<List<DropDownListModel>> GetExpList();
        Task<ResponseModel> GetDslMileage(RequestModel request);
    }
}
