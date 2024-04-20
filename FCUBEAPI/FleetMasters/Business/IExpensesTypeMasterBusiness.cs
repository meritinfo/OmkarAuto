using FleetMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetMasters.Business
{
    public interface IExpensesTypeMasterBusiness
    {
        Task<ResponseModel> ExpensesTypeMasterSave(ExpensesTypeMasterModel expenseTypeMasterModel);
    }
}
