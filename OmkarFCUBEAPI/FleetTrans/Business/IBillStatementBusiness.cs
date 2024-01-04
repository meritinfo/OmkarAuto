using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IBillStatementBusiness
    {
        Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request);
        Task<ResponseModel> SaveBillStatementDetails(BillStatementModel request);
        Task<BillStatementList> GetBillStatementList(PageRequest request);
        Task<ResponseModel> BillsStatementDelete(Request requestModel);
        Task<BillStatementSearchListModel> GetBillStatementInnerGridList(BillStatementInnerGridRequest request);
    }
}
