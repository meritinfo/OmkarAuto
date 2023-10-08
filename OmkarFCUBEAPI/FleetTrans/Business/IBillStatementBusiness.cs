using FleetTrans.Models;

namespace FleetTrans.Business
{
    public interface IBillStatementBusiness
    {
        Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request);
    }
}
