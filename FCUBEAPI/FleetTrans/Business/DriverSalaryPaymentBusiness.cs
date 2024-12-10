using DocumentFormat.OpenXml.Office2016.Excel;
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
    public class DriverSalaryPaymentBusiness : IDriverSalaryPaymentBusiness
    {
        readonly IDriverSalaryPaymentRepository driverSalaryPaymentRepository;
        public DriverSalaryPaymentBusiness(IDriverSalaryPaymentRepository _driverSalaryPaymentRepository)
        {
            driverSalaryPaymentRepository = _driverSalaryPaymentRepository;
        }
        public async Task<ResponseModel> DriverSalaryPaymentSave(DriverSalaryPaymentModel driverSalaryPaymentModel)
        {
            return await driverSalaryPaymentRepository.DriverSalaryPaymentSave(driverSalaryPaymentModel);
        }
        public async Task<ResponseModel> DriverSalaryPaymentDelete(RequestModel request)
        {
            return await driverSalaryPaymentRepository.DriverSalaryPaymentDelete(request);
        }
        public async Task<DriverSalaryPaymentList> GetDriverSalaryPaymentList(ReportRequestModel request)
         {
            return await driverSalaryPaymentRepository.GetDriverSalaryPaymentList(request);
         }

}
}
