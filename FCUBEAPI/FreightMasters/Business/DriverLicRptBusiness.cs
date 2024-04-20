using Microsoft.Extensions.Options;
using FreightMasters.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Excel = Microsoft.Office.Interop.Excel;
using Microsoft.Office.Interop.Excel;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    public class DriverLicRptBusiness: IDriverLicRptBusiness
    {
        readonly IDriverLicRptRepository driverLicRptRepository;
        public DriverLicRptBusiness(IDriverLicRptRepository _driverLicRptRepository)
        {
            driverLicRptRepository = _driverLicRptRepository;
        }
        public async Task<DriverLicRptListModel> GetDriverLicRptList(ReportRequestModel request)
        {
            return await driverLicRptRepository.GetDriverLicRptList(request);
        }
        public async Task<ResponseModel> ExcelDriverLicRptList(ReportRequestModel request)
        {
            return await driverLicRptRepository.ExcelDriverLicRptList(request);
        }


    }
}
