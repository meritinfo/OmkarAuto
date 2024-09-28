using FinanceMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Models
{
    public class ExpenseBudgetsList
    {
        public List<ExpenseBudgetsModel> ExpenseList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
