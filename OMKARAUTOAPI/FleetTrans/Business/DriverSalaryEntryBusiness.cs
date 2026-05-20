using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public class DriverSalaryEntryBusiness: IDriverSalaryEntryBusiness
    {
        readonly IDriverSalaryEntryRepository driverSalaryEntryRepository;
        public DriverSalaryEntryBusiness(IDriverSalaryEntryRepository _driverSalaryEntryRepository)
        {
            driverSalaryEntryRepository = _driverSalaryEntryRepository;
        }
        public async Task<ResponseModel> DriverSalaryEntrySave(DriverSalaryEntryModel driverSalaryEntryModel)
        {
            return await driverSalaryEntryRepository.DriverSalaryEntrySave(driverSalaryEntryModel);
        }
        public async Task<DriverSalaryEntryList> GetDriverSalaryEntryList(ReportRequestModel request)
        {
            return await driverSalaryEntryRepository.GetDriverSalaryEntryList(request);
        }
        public async Task<ResponseModel> DriverSalaryEntryDelete(RequestModel request)
        {
            return await driverSalaryEntryRepository.DriverSalaryEntryDelete(request);
        }
    }
}
