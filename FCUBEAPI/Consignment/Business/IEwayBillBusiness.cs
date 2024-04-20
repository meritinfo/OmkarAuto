using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IEwayBillBusiness
    {
        Task<EwayBillExtListModel> GetEWayBillExtList(PageRequest request);
        Task<ResponseModel> EWayBillExtend(EwayBillExtModel request);
    }

}
