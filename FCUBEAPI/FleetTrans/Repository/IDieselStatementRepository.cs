using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface IDieselStatementRepository
    {
        Task<DieselStatementModel> GetDieselStatementSearchList(ReportRequestModel request);
        Task<ResponseModel> SaveDieselStatementDetails(DieselStatementModel request);
        Task<DieselStatementList> GetDieselStatementList(ReportRequestModel request);
        Task<DieselStatementModel> GetDieselStatementInnerGridList(RequestModel request);
        Task<ResponseModel> DieselStatementDetailsDelete(RequestModel request);
        Task<DieselStatementList> GetHappayDieselList(ReportRequestModel request);
        Task<DieselStatementModel> GetHappayDieselSearchList(ReportRequestModel request);
        Task<ResponseModel> SaveHappayStatementDetails(DieselStatementModel request);
        Task<ResponseModel> DieselStatementSave(DieselStmtModel dieselStmtModel);
        Task<DieselStmtListModel> GetDieselStmtList(ReportRequestModel request);
        Task<DieselStmtModel> GetDieselStmtInnerGridList(RequestModel request);
        Task<ResponseModel> DieselStatementDelete(RequestModel request);
    }
}
