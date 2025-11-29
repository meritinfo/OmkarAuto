using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;
using Consignment.Models;

namespace FleetTrans.Repository
{
    public interface ITripPaymentsRepository
    {
        Task<ResponseModel> TripPaymentsSave(TripPaymentsModel tripPaymentsModel);
        Task<TripPaymentsList> GetTripPaymentsList(ReportRequestModel request);
        Task<TripModel> GetTripDetail(TripVehicleModel request);
        Task<TripModel> GetTripFromAndToDetail(RequestModel request);
        Task<TripDslDetail> GetTripDslDetail(TripVehicleModel request);
        Task<ResponseModel> TripPaymentsDelete(RequestModel requestModel);
        Task<List<DropDownListModel>> GetCreditAcList();
        Task<List<DropDownListModel>> GetCrAcListForCustWizard();
        Task<List<DropDownListModel>> GetCreditAcList2(RequestModel request);
        Task<ConsignmentModel> GetLrDtlsForTripPmts(RequestModel req);
        Task<ResponseModel> GetVoucherPrint(RequestModel request);
        Task<ReportRequestModel> TripPaymentsLoadDetails(RequestModel req);
        Task<ResponseModel> GetTripPmtLoadShow();
    }
}
