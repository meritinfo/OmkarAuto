using Consignment.Models;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Office2016.Excel;
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
        public async Task<ConsignmentModel> GetLrDtlsForTripPmts(RequestModel request)
        {
            return await tripPaymentsRepository.GetLrDtlsForTripPmts(request);
        }
        public async Task<ResponseModel> GetVoucherPrint(RequestModel request)
        {
            return await tripPaymentsRepository.GetVoucherPrint(request);
        }
        public async Task<ReportRequestModel> TripPaymentsLoadDetails(RequestModel request)
        {
            return await tripPaymentsRepository.TripPaymentsLoadDetails(request);
        }
        public async Task<ResponseModel> GetTripPmtLoadShow()
        {
            return await tripPaymentsRepository.GetTripPmtLoadShow();
        }
        public async Task<ResponseModel> GetTransTypeValidations(RequestModel req)
        {
            return await tripPaymentsRepository.GetTransTypeValidations(req);
        }
        public async Task<ReportRequestModel> GetDriverAccountDetails(RequestModel request)
        {
            return await tripPaymentsRepository.GetDriverAccountDetails(request);
        }

        public async Task<ResponseModel> TripPaymentsBrplSave(TripPaymentsModel tripPaymentsModel)
        {
            return await tripPaymentsRepository.TripPaymentsBrplSave(tripPaymentsModel);
        }

    }
}
