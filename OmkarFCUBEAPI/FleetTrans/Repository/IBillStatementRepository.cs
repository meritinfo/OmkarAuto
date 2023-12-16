using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface IBillStatementRepository
    {
        Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request);
        Task<ResponseModel> SaveBillStatementDetails(BillStatementModel request);
        Task<BillStatementList> GetBillStatementList(PageRequest request);
        Task<BillStatementSearchListModel> GetBillStatementInnerGridList(BillStatementInnerGridRequest request);
    }
}
