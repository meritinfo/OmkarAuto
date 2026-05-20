using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface IDriverSalaryStmtRepository
    {
        Task<DriverSalaryStatementList> GetDriverSalaryStatementList(PageRequest request);
        Task<ResponseModel> SaveDriverSalaryStatementDetails(DriverSalaryStatementModel request);
        Task<DriverSalarySearchListModel> GetDriverSalarySearchList(DriverSalarySearchListRequest request);
        Task<DriverSalarySearchListModel> GetDriverSalaryInnerGridList(RequestModel request);
        Task<ResponseModel> DriverSalaryDelete(RequestModel requestModel);
    }
}
