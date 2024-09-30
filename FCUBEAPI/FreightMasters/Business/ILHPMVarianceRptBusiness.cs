using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface ILHPMVarianceRptBusiness
    {
        Task<LHPMVarianceRptListModel> GetLHPMVarianceRptList(ReportRequestModel request);
        Task<ResponseModel> GetLHPMVarianceRptExcel(ReportRequestModel request);
    }
}
