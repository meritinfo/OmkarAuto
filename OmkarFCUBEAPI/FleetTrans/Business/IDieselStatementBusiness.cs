using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IDieselStatementBusiness
    {
        Task<DieselStatementModel> GetDieselStatementSearchList(PageFromDtToDtRequest request);
        Task<ResponseModel> SaveDieselStatementDetails(DieselStatementModel request);
        Task<DieselStatementList> GetDieselStatementList(PageFromDtToDtRequest request);
        Task<ResponseModel> DieselStatementDetailsDelete(Request request);
    }
}
