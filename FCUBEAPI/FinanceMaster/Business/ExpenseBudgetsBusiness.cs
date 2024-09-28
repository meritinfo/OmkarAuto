using FinanceMaster.Models;
using FinanceMaster.Repository;
using FinanceMasters.Models;
using FinanceMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Business
{
    public class ExpenseBudgetsBusiness: IExpenseBudgetsBusiness
    {
        readonly IExpenseBudgetsRepository expenseBudgetsRepository;
        public ExpenseBudgetsBusiness(IExpenseBudgetsRepository _expenseBudgetsRepository)
        {
            expenseBudgetsRepository = _expenseBudgetsRepository;
        }
        public async Task<ResponseModel> ExpenseBudgetsSave(ExpenseBudgetsList expenseBudgetsList)
        {
            return await expenseBudgetsRepository.ExpenseBudgetsSave(expenseBudgetsList);
        }
        public async Task<ExpenseBudgetsList> GeExpenseBudgetsList(PageRequest request)
        {
            return await expenseBudgetsRepository.GeExpenseBudgetsList(request);
        }


    }
}
