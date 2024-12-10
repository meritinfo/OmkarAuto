using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface IDriverSalaryPaymentBusiness
    {
        Task<ResponseModel> DriverSalaryPaymentSave(DriverSalaryPaymentModel driverSalaryPaymentModel);
        Task<ResponseModel> DriverSalaryPaymentDelete(RequestModel request);
        Task<DriverSalaryPaymentList> GetDriverSalaryPaymentList(ReportRequestModel request);
    }
}
