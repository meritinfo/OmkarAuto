using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace FreightMasters.Repository
{
    public interface ILRWithOutChallanRptRepository
    {
        Task<LRWithOutChallanRptListModel> GetLRWithOutChallanRptList(ReportRequestModel request);
        Task<ResponseModel> GetLRWithOutChallanRptExcel(ReportRequestModel request);
    }
}
