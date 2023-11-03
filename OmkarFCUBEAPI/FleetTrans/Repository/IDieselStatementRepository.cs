using FleetTrans.Models;

namespace FleetTrans.Repository
{
    public interface IDieselStatementRepository
    {
        Task<DieselStatementSearchListModel> GetDieselStatementSearchList(DieselStatementSearchListRequest request);
        Task<ResponseModel> SaveDieselStatementDetails(DieselStatementSaveRequest request);
        Task<DieselStatementList> GetDieselStatementList(DieselStatementListRequest request);
    }
}
