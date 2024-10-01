using FinanceMaster.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Repository
{
    public interface IExpenseBudgetsRepository
    {
         Task<ResponseModel> ExpenseBudgetsSave(ExpenseBudgetsList expenseBudgetsModel);

        Task<ExpenseBudgetsList> GetExpenseBudgetsInnerGridList(RequestModel request);
    }
}
