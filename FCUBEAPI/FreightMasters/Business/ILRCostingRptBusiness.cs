using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface ILRCostingRptBusiness
    {
        Task<LRCostingRptListModel> GetLRCostingRptList(ReportRequestModel request);
        Task<ResponseModel> GetLRCostingRptExcel(ReportRequestModel request);
    }
}
