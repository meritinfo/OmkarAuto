using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class DriverSalaryPaymentModel
    {
        public string? Masterid { get; set; }
        public string? BranchCode { get; set; }
        public string? SalaryDate { get; set; }
        public string? DriverId { get; set; }
        public string? VehicleId { get; set; }
        public string? SalaryFromDt { get; set; }
        public string? SalaryToDt { get; set; }
        public string? SalDays { get; set; }
        public string? SalPerDay { get; set; }
        public string? TotalSalary { get; set; }
        public string? Remarks { get; set; }
        public string? PmtType { get; set; }
        public string? CreditAc { get; set; }
        public string? YearId { get; set; }
        public string? branch { get; set; }
        public string? driver { get; set; }
        public string? vehicle { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
