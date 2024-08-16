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
    public class UnBilledRptBusiness : IUnBilledRptBusiness
    {
        readonly IUnBilledRptRepository unBilledRptRepository;
        public UnBilledRptBusiness(IUnBilledRptRepository _unBilledRptRepository)
        {
            unBilledRptRepository = _unBilledRptRepository;
        }
        public async Task<UnBilledRptListModel> GetUnBilledRptList(ReportRequestModel request)
        {
            return await unBilledRptRepository.GetUnBilledRptList(request);
        }
        public async Task<ResponseModel> GetUnBilledRptExcel(ReportRequestModel request)
        {
            return await unBilledRptRepository.GetUnBilledRptExcel(request);
        }

    }
}
