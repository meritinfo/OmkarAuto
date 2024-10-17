using FleetTrans.Business;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class TripPaymentsBusiness : ITripPaymentsBusiness
    {
        readonly ITripPaymentsRepository tripPaymentsRepository;
        public TripPaymentsBusiness(ITripPaymentsRepository _tripPaymentsRepository)
        {
            tripPaymentsRepository = _tripPaymentsRepository;
        }

        /// <summary>
        /// Business method for save Branch master details
        /// </summary>
        /// <param name="BranchMasterModel"></param>
        public async Task<ResponseModel> TripPaymentsSave(TripPaymentsModel tripPaymentsModel)
        {
            return await tripPaymentsRepository.TripPaymentsSave(tripPaymentsModel);
        }
        public async Task<TripPaymentsList> GetTripPaymentsList(ReportRequestModel request)
        {
            return await tripPaymentsRepository.GetTripPaymentsList(request);
        }
        public async Task<ResponseModel> TripPaymentsDelete(RequestModel requestModel)
        {
            return await tripPaymentsRepository.TripPaymentsDelete(requestModel);
        }

        public async Task<TripModel> GetTripDetail(TripVehicleModel request)
        {
            return await tripPaymentsRepository.GetTripDetail(request);
        }
        public async Task<TripModel> GetTripFromAndToDetail(RequestModel request)
        {
            return await tripPaymentsRepository.GetTripFromAndToDetail(request);
        }
        public async Task<TripDslDetail> GetTripDslDetail(TripVehicleModel request)
        {
            return await tripPaymentsRepository.GetTripDslDetail(request);
        }
        public async Task<List<DropDownListModel>> GetCreditAcList()
        {
            return await tripPaymentsRepository.GetCreditAcList();
        }
        public async Task<List<DropDownListModel>> GetCrAcListForCustWizard()
        {
            return await tripPaymentsRepository.GetCrAcListForCustWizard();
        }
        public async Task<List<DropDownListModel>> GetCreditAcList2(RequestModel request)
        {
            return await tripPaymentsRepository.GetCreditAcList2(request);
        }


    }
}
