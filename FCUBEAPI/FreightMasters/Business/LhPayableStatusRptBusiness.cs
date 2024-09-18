using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

namespace FreightMasters.Business
{
    public class LhPayableStatusRptBusiness :ILhPayableStatusRptBusiness
    {
        readonly ILhPayableStatusRptRepository lhPayableStatusRptRepository;
        public LhPayableStatusRptBusiness(ILhPayableStatusRptRepository _lhPayableStatusRptRepository)
        {
            lhPayableStatusRptRepository = _lhPayableStatusRptRepository;
        }
        public async Task<LhPayableStatusRptListModel> GetLhPayableStatusRptList(ReportRequestModel request)
        {
            return await lhPayableStatusRptRepository.GetLhPayableStatusRptList(request);
        }
        public async Task<ResponseModel> GetLhPayableStatusRptExcel(ReportRequestModel request)
        {
            return await lhPayableStatusRptRepository.GetLhPayableStatusRptExcel(request);
        }
    }
}
