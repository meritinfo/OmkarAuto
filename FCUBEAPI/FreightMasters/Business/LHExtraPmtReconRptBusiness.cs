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
    public class LHExtraPmtReconRptBusiness: ILHExtraPmtReconRptBusiness
    {
        readonly ILHExtraPmtReconRptRepository lHExtraPmtReconRptRepository;
        public LHExtraPmtReconRptBusiness(ILHExtraPmtReconRptRepository _lHExtraPmtReconRptRepository)
        {
            lHExtraPmtReconRptRepository = _lHExtraPmtReconRptRepository;
        }
        public async Task<LHExtraPmtReconRptListModel> GetLHExtraPmtReconRptList(ReportRequestModel request)
        {
            return await lHExtraPmtReconRptRepository.GetLHExtraPmtReconRptList(request);
        }
        public async Task<ResponseModel> GetLHExtraPmtReconRptExcel(ReportRequestModel request)
        {
            return await lHExtraPmtReconRptRepository.GetLHExtraPmtReconRptExcel(request);
        }
    }
}
