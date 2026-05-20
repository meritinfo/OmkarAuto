using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface IEwayBillExpRptBusiness
    {
        Task<EwayBillExtListModel> GetEWayBillExtRptList(ReportRequestModel request);
        Task<ResponseModel> GetEWayBillExtRptExcel(ReportRequestModel request);
    }

}
