using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface ITripPaymentsRptBusiness
    {
        Task<TripPaymentsRptListModel> GetTripPaymentsRptList(ReportRequestModel request);
        Task<ResponseModel> ExcelTripPaymentsRptList(ReportRequestModel request);
        Task<List<DropDownListModel>> GetTripPaymentsCreditList();

    }
}
