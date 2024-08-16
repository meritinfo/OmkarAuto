using Shared.Models;
using FreightMasters.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IUnBilledRptBusiness
    {
        Task<UnBilledRptListModel> GetUnBilledRptList(ReportRequestModel request);
        Task<ResponseModel> GetUnBilledRptExcel(ReportRequestModel request);

    }

}
