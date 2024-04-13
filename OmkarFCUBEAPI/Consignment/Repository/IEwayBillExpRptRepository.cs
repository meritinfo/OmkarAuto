using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IEwayBillExpRptRepository
    {
        Task<EwayBillExtListModel> GetEWayBillExtRptList(ReportRequestModel request);
        Task<ResponseModel> GetEWayBillExtRptExcel(ReportRequestModel request);
    }
}
