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
    public class DistanceMasterFrtRptBusiness: IDistanceMasterFrtRptBusiness
    {
        readonly IDistanceMasterFrtRptRepository distanceMasterFrtRptRepository;
        public DistanceMasterFrtRptBusiness(IDistanceMasterFrtRptRepository _distanceMasterFrtRptRepository)
        {
            distanceMasterFrtRptRepository = _distanceMasterFrtRptRepository;
        }
        public async Task<DistanceMasterFrtRptListModel> GetDistanceMasterFrtRptList(ReportRequestModel request)
        {
            return await distanceMasterFrtRptRepository.GetDistanceMasterFrtRptList(request);
        }
        public async Task<ResponseModel> ExcelDistanceMasterFrtRptList(ReportRequestModel request)
        {
            return await distanceMasterFrtRptRepository.ExcelDistanceMasterFrtRptList(request);
        }

    }
}
