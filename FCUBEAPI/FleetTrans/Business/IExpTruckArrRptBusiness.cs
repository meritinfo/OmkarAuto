using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IExpTruckArrRptBusiness
    {
        Task<ExpTruckArrRptListModel> GetExpTruckArrRPTList(ReportRequestModel request);
        Task<ResponseModel> ExcelExpTruckArrRPTList(ReportRequestModel request);

    }
}
