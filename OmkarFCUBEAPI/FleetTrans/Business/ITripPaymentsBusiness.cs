using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface ITripPaymentsBusiness
    {
        Task<ResponseModel> TripPaymentsSave(TripPaymentsModel tripPaymentsModel);
        Task<TripPaymentsList> GetTripPaymentsList(TripPaymentsListRequest request);
        Task<TripModel> GetTripDetail(TripVehicleModel request);
        Task<List<BranchListModel>> GetCreditAcList();
       Task<List<BranchListModel>> GetCreditAcList2(AcModel request);


    }
}
