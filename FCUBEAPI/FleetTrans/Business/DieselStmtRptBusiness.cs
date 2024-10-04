using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public class DieselStmtRptBusiness: IDieselStmtRptBusiness
    {
        readonly IDieselStmtRptRepository dieselStmtRptRepository;
        public DieselStmtRptBusiness(IDieselStmtRptRepository _dieselStmtRptRepository)
        {
            dieselStmtRptRepository = _dieselStmtRptRepository;
        }
        public async Task<DieselStmtRptListModel> GetDieselStmtRptList(ReportRequestModel request)
        {
            return await dieselStmtRptRepository.GetDieselStmtRptList(request);
        }
        public async Task<ResponseModel> GetDieselStmtRptExcel(ReportRequestModel request)
        {
            return await dieselStmtRptRepository.GetDieselStmtRptExcel(request);
        }
    }
}
