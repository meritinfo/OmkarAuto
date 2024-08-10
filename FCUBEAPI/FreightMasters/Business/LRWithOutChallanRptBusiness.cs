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
    public class LRWithOutChallanRptBusiness : ILRWithOutChallanRptBusiness
    {
        readonly ILRWithOutChallanRptRepository lRWithOutChallanRptRepository;
        public LRWithOutChallanRptBusiness(ILRWithOutChallanRptRepository _lRWithOutChallanRptRepository)
        {
            lRWithOutChallanRptRepository = _lRWithOutChallanRptRepository;
        }
        public async Task<LRWithOutChallanRptListModel> GetLRWithOutChallanRptList(ReportRequestModel request)
        {
            return await lRWithOutChallanRptRepository.GetLRWithOutChallanRptList(request);
        }
        public async Task<ResponseModel> GetLRWithOutChallanRptExcel(ReportRequestModel request)
        {
            return await lRWithOutChallanRptRepository.GetLRWithOutChallanRptExcel(request);
        }

    }
}
