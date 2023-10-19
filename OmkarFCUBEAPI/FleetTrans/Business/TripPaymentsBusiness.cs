using FleetTrans.Business;
using FleetTrans.Models;
using FleetTrans.Repository;

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

        public async Task<TripPaymentsList> GetTripPaymentsList(TripPaymentsListRequest request)
        {
            return await tripPaymentsRepository.GetTripPaymentsList(request);
        }

        public async Task<TripModel> GetTripDetail(TripVehicleModel request)
        {
            return await tripPaymentsRepository.GetTripDetail(request);
        }
        public async Task<List<BranchListModel>> GetCreditAcList()
        {
            return await tripPaymentsRepository.GetCreditAcList();
        }
       // public async Task<List<BranchListModel>> GetCreditAcList2(AcModel request)
       // {
       //   return await tripPaymentsRepository.GetCreditAcList2(request);
       //}

    }
}
