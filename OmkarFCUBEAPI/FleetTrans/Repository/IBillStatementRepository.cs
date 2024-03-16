using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface IBillStatementRepository
    {
        Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request);
        Task<ResponseModel> SaveBillStatementDetails(BillStatementModel request);
        Task<BillStatementList> GetBillStatementList(PageRequest request);
        Task<ResponseModel> BillsStatementDelete(RequestModel requestModel);
        Task<BillStatementSearchListModel> GetBillStatementInnerGridList(RequestModel request);
    }
}
