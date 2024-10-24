using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public class LRCostingRptBusiness : ILRCostingRptBusiness
    {
        readonly ILRCostingRptRepository lRCostingRptRepository;
        public LRCostingRptBusiness(ILRCostingRptRepository _lRCostingRptRepository)
        {
            lRCostingRptRepository = _lRCostingRptRepository;
        }
        public async Task<LRCostingRptListModel> GetLRCostingRptList(ReportRequestModel request)
        {
            return await lRCostingRptRepository.GetLRCostingRptList(request);
        }
        public async Task<ResponseModel> GetLRCostingRptExcel(ReportRequestModel request)
        {
            return await lRCostingRptRepository.GetLRCostingRptExcel(request);
        }
    }
}
