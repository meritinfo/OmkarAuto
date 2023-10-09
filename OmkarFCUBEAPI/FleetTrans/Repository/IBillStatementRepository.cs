using FleetTrans.Models;

namespace FleetTrans.Repository
{
    public interface IBillStatementRepository
    {
        Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request);
        Task<ResponseModel> SaveBillStatementDetails(BillStatementSaveRequest request);
    }
}
