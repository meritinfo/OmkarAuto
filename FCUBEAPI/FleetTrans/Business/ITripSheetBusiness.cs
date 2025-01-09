using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface ITripSheetBusiness
    {
        Task<ResponseModel> TripSheetSave(TripSheetModel tripMasterModel);
        Task<TripSheetList> GetTripSheetList(ReportRequestModel request);
        Task<TripSheetModel> GetTripSheetInnerSearchList(ReportRequestModel request);
        Task<TripSheetModel> GetTripSheetInnerGridList(RequestModel request);
        Task<ResponseModel> TripSheetDelete(RequestModel requestModel);
        Task<ResponseModel> GetNextTripSalDate(RequestModel request);
        Task<ResponseModel> GetTripJetPrintPdf(RequestModel request);
    }
}
