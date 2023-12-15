using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IDriverSalaryStatementBusiness
    {
        Task<DriverSalaryStatementList>GetDriverSalaryStatementList(PageRequest request);
    }
}
