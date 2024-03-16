using System;
using FleetTrans.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IDriverSalaryStmtBusiness
  
    {
        Task<DriverSalaryStatementList> GetDriverSalaryStatementList(PageRequest request);
        Task<ResponseModel> SaveDriverSalaryStatementDetails(DriverSalaryStatementModel request);
        Task<ResponseModel> DriverSalaryDelete(RequestModel requestModel);
        Task<DriverSalarySearchListModel> GetDriverSalarySearchList(DriverSalarySearchListRequest request);
        Task<DriverSalarySearchListModel> GetDriverSalaryInnerGridList(RequestModel request);
    }
}
