using FleetMasters.Models;
using FleetMasters.Repository;

namespace FleetMasters.Business
{
    public class ExpensesTypeMasterBusiness : IExpensesTypeMasterBusiness
    {
        readonly IExpensesTypeMasterRepository expensesTypeMasterRepository;
        public ExpensesTypeMasterBusiness(IExpensesTypeMasterRepository _expensesTypeMasterRepository)
        {
            expensesTypeMasterRepository = _expensesTypeMasterRepository;
        }

        /// <summary>
        /// Business method for save expenses type master details
        /// </summary>
        /// <param name="vehicleTypeMasterModel"></param>
        public async Task<ResponseModel> ExpensesTypeMasterSave(ExpensesTypeMasterModel expensesTypeMasterModel)
        {
            return await expensesTypeMasterRepository.ExpensesTypeMasterSave(expensesTypeMasterModel);
        }
    }
}
