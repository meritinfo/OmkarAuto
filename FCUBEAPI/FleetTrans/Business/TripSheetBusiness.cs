using DocumentFormat.OpenXml.Office2016.Excel;
using FleetTrans.Business;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    public class TripSheetBusiness :ITripSheetBusiness
    {
        readonly ITripSheetRepository tripSheetRepository;
        public TripSheetBusiness(ITripSheetRepository _tripSheetRepository)
        {
            tripSheetRepository = _tripSheetRepository;
        }

        public async Task<ResponseModel> TripSheetSave(TripSheetModel TripSheetModel)
        {
            return await tripSheetRepository.TripSheetSave(TripSheetModel);
        }
        public async Task<TripSheetList> GetTripSheetList(ReportRequestModel request)
        {
            return await tripSheetRepository.GetTripSheetList(request);
        }
        public async Task<TripSheetModel> GetTripSheetInnerSearchList(ReportRequestModel request)
        {
            return await tripSheetRepository.GetTripSheetInnerSearchList(request);
        }
        public async Task<TripSheetModel> GetTripSheetInnerGridList(RequestModel request)
        {
            return await tripSheetRepository.GetTripSheetInnerGridList(request);
        }
        public async Task<ResponseModel> GetNextTripSalDate(RequestModel request)
        {
            return await tripSheetRepository.GetNextTripSalDate(request);
        }
        public async Task<ResponseModel> GetTripJetPrintPdf(RequestModel request)
        {
            return await tripSheetRepository.GetTripJetPrintPdf(request);
        }

    }
}
