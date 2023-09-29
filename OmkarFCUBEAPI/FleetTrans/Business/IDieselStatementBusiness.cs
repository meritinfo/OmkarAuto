using FleetTrans.Models;

namespace FleetTrans.Business
{
    public interface IDieselStatementBusiness
    {
        Task<DieselStatementSearchListModel> GetDieselStatementSearchList(DieselStatementSearchListRequest request);
        Task<ResponseModel> SaveDieselStatementDetails(DieselStatementSaveRequest request);
    }
}
