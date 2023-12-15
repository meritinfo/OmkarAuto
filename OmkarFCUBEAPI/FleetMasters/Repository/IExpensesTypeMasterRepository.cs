using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Repository
{
    public interface IExpensesTypeMasterRepository
    {
        Task<ResponseModel> ExpensesTypeMasterSave(ExpensesTypeMasterModel expensestypeMasterModel);
        
    }
}
