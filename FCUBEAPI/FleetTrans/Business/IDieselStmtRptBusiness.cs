using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface IDieselStmtRptBusiness
    {
        Task<DieselStmtRptListModel> GetDieselStmtRptList(ReportRequestModel request);
        //  Task<ResponseModel> ExcelDocRenewalRptList(ReportRequestModel request);
        Task<ResponseModel> GetDieselStmtRptExcel(ReportRequestModel request);
    }
}
