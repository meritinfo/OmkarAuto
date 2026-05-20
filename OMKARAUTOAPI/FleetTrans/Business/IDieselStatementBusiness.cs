using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IDieselStatementBusiness
    {
        Task<DieselStatementModel> GetDieselStatementSearchList(ReportRequestModel request);
        Task<ResponseModel> SaveDieselStatementDetails(DieselStatementModel request);
        Task<DieselStatementList> GetDieselStatementList(ReportRequestModel request);
        Task<ResponseModel> DieselStatementDetailsDelete(RequestModel request);
        Task<DieselStatementModel> GetDieselStatementInnerGridList(RequestModel request);
        Task<DieselStatementList> GetHappayDieselList(ReportRequestModel request);
        Task<DieselStatementModel> GetHappayDieselSearchList(ReportRequestModel request);
        Task<ResponseModel> DieselImportSave(DieselStatementModel dieselStmtModel);
        Task<DieselStatementList> GetDieselImportList(ReportRequestModel request);
        Task<DieselStatementModel> GetDieselImportInnerGridList(RequestModel request);
        Task<DieselStatementModel> GetBpclDetailsList(ReportRequestModel request);
    }
}
