using System;
using FleetTrans.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface IDriverSalaryStmtBusiness
  
    {
        Task<DriverSalaryStatementList> GetDriverSalaryStatementList(DriverSalaryListRequest request);
        Task<ResponseModel> SaveDriverSalaryStatementDetails(DriverSalaryStatementModel request);
        Task<DriverSalarySearchListModel> GetDriverSalarySearchList(DriverSalarySearchListRequest request);
    }
}
