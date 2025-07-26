using DocumentFormat.OpenXml.Office2016.Excel;
using FleetTrans.Business;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    public class TripMasterLlpBusiness : ITripMasterLlpBusiness
    {
        readonly ITripMasterLlpRepository tripMasterRepository;
        public TripMasterLlpBusiness(ITripMasterLlpRepository _tripMasterRepository)
        {
            tripMasterRepository = _tripMasterRepository;
        }
        public async Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel)
        {
            return await tripMasterRepository.TripMasterSave(tripMasterModel);
        }
        public async Task<TripMasterList> GetTripMasterList(ReportRequestModel request)
        {
            return await tripMasterRepository.GetTripMasterList(request);
        }
        public async Task<TripMasterModel> GetTripMasterInnerSearchLlpList(ReportRequestModel request)
        {
            return await tripMasterRepository.GetTripMasterInnerSearchLlpList(request);
        }
        public async Task<ResponseModel> TripMasterDelete(RequestModel requestModel)
        {
            return await tripMasterRepository.TripMasterDelete(requestModel);
        }
        public async Task<TripMasterModel> GetTripMasterInnerGridLlpList(RequestModel request)
        {
            return await tripMasterRepository.GetTripMasterInnerGridLlpList(request);
        }
        public async Task<List<DropDownListModel>> GetDriverList()
        {
            return await tripMasterRepository.GetDriverList();
        }
        public async Task<ResponseModel> GetNextTripNo(RequestModel request)
        {
            return await tripMasterRepository.GetNextTripNo(request);
        }
        public async Task<List<DropDownListModel>> GetExpList()
         {
            return await tripMasterRepository.GetExpList();
        }
        public async Task<ResponseModel> GetDslMileage(RequestModel request)
        {
            return await tripMasterRepository.GetDslMileage(request);
        }
        public async Task<ResponseModel> GetBhattaRate(RequestModel request)
        {
            return await tripMasterRepository.GetBhattaRate(request);
        }
        public async Task<ReportRequestModel> GetOpeningBal(ReportRequestModel request)
        {
            return await tripMasterRepository.GetOpeningBal(request);
        }
        public async Task<ResponseModel> GetTripPrintPdf(RequestModel request)
        {
            return await tripMasterRepository.GetTripPrintPdf(request);
        }

    }
}
