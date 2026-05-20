using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface IDriverSalaryEntryBusiness
    {
        Task<ResponseModel> DriverSalaryEntrySave(DriverSalaryEntryModel driverSalaryEntryModel);
        Task<ResponseModel> DriverSalaryEntryDelete(RequestModel request);
        Task<DriverSalaryEntryList> GetDriverSalaryEntryList(ReportRequestModel request);

    }
}
