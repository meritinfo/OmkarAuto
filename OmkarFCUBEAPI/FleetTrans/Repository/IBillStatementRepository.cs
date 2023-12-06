using FleetTrans.Models;

namespace FleetTrans.Repository
{
    public interface IBillStatementRepository
    {
        Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request);
        Task<ResponseModel> SaveBillStatementDetails(BillStatementModel request);
        Task<BillStatementList> GetBillStatementList(BillStatementListRequest request);
        Task<BillStatementModel> GetBillStatementInnerGridList(BillStatementInnerGridRequest request);
    }
}
