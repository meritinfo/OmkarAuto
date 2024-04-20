using FleetTrans.Repository;
using FleetTrans.Models;



using Shared.Models;
using DocumentFormat.OpenXml.Office2016.Excel;

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
        public async Task<List<DropDownListModel>> GetTripPaymentsCreditList()
        {
            return await tripPaymentsRptRepository.GetTripPaymentsCreditList();
        }
    }
}
