using DocumentFormat.OpenXml.Office2016.Excel;
using FleetTrans.Business;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    public class TripMasterBusiness :ITripMasterBusiness
    {
        readonly ITripMasterRepository tripMasterRepository;
        public TripMasterBusiness(ITripMasterRepository _tripMasterRepository)
        {
            tripMasterRepository = _tripMasterRepository;
        }

        /// <summary>
        /// Business method for save Branch master details
        /// </summary>
        /// <param name="BranchMasterModel"></param>
        public async Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel)
        {
            return await tripMasterRepository.TripMasterSave(tripMasterModel);
        }

        public async Task<TripSheetList> GetTripSheetList(ReportRequestModel request)
        {
            return await tripMasterRepository.GetTripSheetList(request);
        }
        public async Task<List<DropDownListModel>> GetDriverList()
        {
            return await tripMasterRepository.GetDriverList();
        }
        public async Task<ResponseModel> TripMasterDelete(RequestModel requestModel)
        {
            return await tripMasterRepository.TripMasterDelete(requestModel);
        }
        public async Task<ResponseModel> GetNextTripNo(RequestModel request)
        {
            return await tripMasterRepository.GetNextTripNo(request);
        }
        public async Task<TripMasterModel> GetTripSheetInnerSearchList(ReportRequestModel request)
        {
            return await tripMasterRepository.GetTripSheetInnerSearchList(request);
        }
        public async Task<TripMasterModel> GetTripSheetInnerGridList(RequestModel request)
        {
            return await tripMasterRepository.GetTripSheetInnerGridList(request);
        }
        public async Task<List<DropDownListModel>> GetExpList()
         {
            return await tripMasterRepository.GetExpList();
        }
        public async Task<ResponseModel> GetDslMileage(RequestModel request)
        {
            return await tripMasterRepository.GetDslMileage(request);
        }

    }
}
