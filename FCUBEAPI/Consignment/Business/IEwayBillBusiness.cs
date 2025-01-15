using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IEwayBillBusiness
    {
        Task<EwayBillExtListModel> GetEWayBillExtList(ReportRequestModel request);
        Task<ResponseModel> EWayBillExtend(EwayBillExtModel request);
        Task<ResponseModel> GetKmsFromApi(DropDownListModel dropDown);
        Task<ResponseModel> GetCurrentLocFromApi(RequestModel request);
        Task<ResponseModel> GetStateNameWithPin(RequestModel request);
    }

}
