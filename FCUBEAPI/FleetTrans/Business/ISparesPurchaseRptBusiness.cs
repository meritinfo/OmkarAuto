using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface ISparesPurchaseRptBusiness
    {
        Task<SparesPurchaseRptListModel> GetSparesPurchaseRptList(ReportRequestModel request);
        Task<ResponseModel> GetSparesPurchaseRptExcel(ReportRequestModel request);

    }
}
