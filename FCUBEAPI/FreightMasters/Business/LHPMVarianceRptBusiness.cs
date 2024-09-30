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
    public class LHPMVarianceRptBusiness: ILHPMVarianceRptBusiness
    {
        readonly ILHPMVarianceRptRepository lHPMVarianceRptRepository;
        public LHPMVarianceRptBusiness(ILHPMVarianceRptRepository _lHPMVarianceRptRepository)
        {
            lHPMVarianceRptRepository = _lHPMVarianceRptRepository;
        }
        public async Task<LHPMVarianceRptListModel> GetLHPMVarianceRptList(ReportRequestModel request)
        {
            return await lHPMVarianceRptRepository.GetLHPMVarianceRptList(request);
        }
        public async Task<ResponseModel> GetLHPMVarianceRptExcel(ReportRequestModel request)
        {
            return await lHPMVarianceRptRepository.GetLHPMVarianceRptExcel(request);
        }
    }
}
