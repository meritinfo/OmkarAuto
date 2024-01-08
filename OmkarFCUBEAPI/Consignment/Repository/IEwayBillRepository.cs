using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IEwayBillRepository
    {
        Task<EwayBillExtListModel> GetEWayBillExtList(PageRequest request);
        Task<ResponseModel> EWayBillExtend(EwayBillExtModel request);
    }
}
