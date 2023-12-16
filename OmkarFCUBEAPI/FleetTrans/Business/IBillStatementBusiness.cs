using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IBillStatementBusiness
    {
        Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request);
        Task<ResponseModel> SaveBillStatementDetails(BillStatementModel request);
        Task<BillStatementList> GetBillStatementList(BillStatementListRequest request);
        Task<BillStatementSearchListModel> GetBillStatementInnerGridList(BillStatementInnerGridRequest request);
    }
}
