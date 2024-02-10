using FleetTrans.Repository;
using FleetTrans.Models;



using Shared.Models;

namespace FleetTrans.Business
{
    public class TripPaymentsRptBusiness: ITripPaymentsRptBusiness
    {
        readonly ITripPaymentsRptRepository tripPaymentsRptRepository;
        public TripPaymentsRptBusiness(ITripPaymentsRptRepository _tripPaymentsRptRepository)
        {
            tripPaymentsRptRepository = _tripPaymentsRptRepository;
        }
        public async Task<TripPaymentsRptListModel> GetTripPaymentsRptList(ReportRequestModel request)
        {
            return await tripPaymentsRptRepository.GetTripPaymentsRptList(request);
        }
        public async Task<ResponseModel> ExcelTripPaymentsRptList(ReportRequestModel request)
        {
            return await tripPaymentsRptRepository.ExcelTripPaymentsRptList(request);
        }
    }
}
