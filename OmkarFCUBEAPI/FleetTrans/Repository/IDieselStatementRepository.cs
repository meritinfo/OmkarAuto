using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface IDieselStatementRepository
    {
        Task<DieselStatementSearchListModel> GetDieselStatementSearchList(DieselStatementSearchListRequest request);
        Task<ResponseModel> SaveDieselStatementDetails(DieselStatementSaveRequest request);
        Task<DieselStatementList> GetDieselStatementList(PageRequest request);
    }
}
