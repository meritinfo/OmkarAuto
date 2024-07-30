using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IEwayBillRepository
    {
        Task<EwayBillExtListModel> GetEWayBillExtList(ReportRequestModel request);
        Task<ResponseModel> EWayBillExtend(EwayBillExtModel request);
        Task<ResponseModel> GetKmsFromApi(DropDownListModel dropDown);
        Task<ResponseModel> GetCurrentLocFromApi(RequestModel request);
    }
}
