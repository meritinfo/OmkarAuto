using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface IDieselStmtRptRepository
    {
        Task<DieselStmtRptListModel> GetDieselStmtRptList(ReportRequestModel request);
        Task<ResponseModel> GetDieselStmtRptExcel(ReportRequestModel request);
    }
}
