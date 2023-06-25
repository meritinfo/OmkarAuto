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


    }
}
