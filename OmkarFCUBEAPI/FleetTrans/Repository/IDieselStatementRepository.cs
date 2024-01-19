using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface IDieselStatementRepository
    {
        Task<DieselStatementModel> GetDieselStatementSearchList(PageFromDtToDtRequest request);
        Task<ResponseModel> SaveDieselStatementDetails(DieselStatementModel request);
        Task<DieselStatementList> GetDieselStatementList(PageFromDtToDtRequest request);
        Task<ResponseModel> DieselStatementDetailsDelete(RequestModel request);
    }
}
