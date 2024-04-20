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
    public class DieselStatementRptBusiness: IDieselStatementRptBusiness
    {
        readonly IDieselStatementRptRepository dieselStatementRptRepository;
        public DieselStatementRptBusiness(IDieselStatementRptRepository _dieselStatementRptRepository)
        {
            dieselStatementRptRepository = _dieselStatementRptRepository;
        }
        public async Task<DieselStatementRptListModel> GetDieselStatementRptList(ReportRequestModel request)
        {
            return await dieselStatementRptRepository.GetDieselStatementRptList(request);
        }
        public async Task<ResponseModel> GetDieselStatementRptExcel(ReportRequestModel request)
        {
            return await dieselStatementRptRepository.GetDieselStatementRptExcel(request);
        }
    }
}
