using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface ITripPaymentsRepository
    {
        Task<ResponseModel> TripPaymentsSave(TripPaymentsModel tripPaymentsModel);
        Task<TripPaymentsList> GetTripPaymentsList(PageRequestDtBrVh request);
        Task<TripModel> GetTripDetail(TripVehicleModel request);
        Task<TripDslDetail> GetTripDslDetail(TripVehicleModel request);
        Task<ResponseModel> TripPaymentsDelete(RequestModel requestModel);
        Task<List<DropDownListModel>> GetCreditAcList();
        Task<List<DropDownListModel>> GetCreditAcList2(AcModel request);
    }
}
