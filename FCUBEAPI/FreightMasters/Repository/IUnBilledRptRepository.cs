using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace FreightMasters.Repository
{
    public interface IUnBilledRptRepository
    {
        Task<UnBilledRptListModel> GetUnBilledRptList(ReportRequestModel request);
        Task<ResponseModel> GetUnBilledRptExcel(ReportRequestModel request);
    }
}
