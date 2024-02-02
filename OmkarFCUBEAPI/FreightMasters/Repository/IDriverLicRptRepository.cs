using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public  interface IDriverLicRptRepository
    {
        Task<DriverLicRptListModel> GetDriverLicRptList(ReportRequestModel request);
        Task<ResponseModel> ExcelDriverLicRptList(ReportRequestModel request);

    }
}
