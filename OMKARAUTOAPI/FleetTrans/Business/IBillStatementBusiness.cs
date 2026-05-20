using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IBillStatementBusiness
    {
        Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request);
        Task<ResponseModel> SaveBillStatementDetails(BillStatementModel request);
        Task<BillStatementList> GetBillStatementList(ReportRequestModel request);
        Task<ResponseModel> BillsStatementDelete(RequestModel requestModel);
        Task<BillStatementSearchListModel> GetBillStatementInnerGridList(RequestModel request);
        Task<List<DropDownListModel>> GetBillStmtCreditAcList();
    }
}
