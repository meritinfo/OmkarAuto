using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface ITripMasterLlpBusiness
    {
        Task<ResponseModel> TripMasterLlpSave(TripMasterModel tripMasterModel);
        Task<TripMasterList> GetTripMasterList(ReportRequestModel request);
        Task<TripMasterModel> GetTripMasterInnerSearchLlpList(ReportRequestModel request);
        Task<TripMasterModel> GetTripMasterInnerGridLlpList(RequestModel request);
        Task<ResponseModel> TripMasterLlpDelete(RequestModel requestModel);
        Task<List<DropDownListModel>> GetDriverList();
        Task<List<DropDownListModel>> GetExpList();
        Task<ResponseModel> GetNextTripNo(RequestModel request);
        Task<ResponseModel> CheckDupliTripNo(ReportRequestModel request);
        Task<ResponseModel> GetDslMileage(RequestModel request);
        Task<ResponseModel> GetBhattaRate(RequestModel request);
        Task<ReportRequestModel> GetOpeningBal(ReportRequestModel request);
        Task<ResponseModel> GetTripPrintPdf(RequestModel request);
    }
}
