using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IBillStatementBusiness
    {
        Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request);
        Task<ResponseModel> SaveBillStatementDetails(BillStatementSaveRequest request);
        Task<BillStatementList> GetBillStatementList(PageRequest request);
    }
}
