using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class DriverSalarySearchModel
    {
        public string? VehicleMasterId { get; set; }
        public string? DriverMasterId { get; set; }
        //public string? SalDays { get; set; }
        public string? SalaryDays { get; set; }
        public string? PoolAmt { get; set; }
        public string? VehicleNo { get; set; }
        public string? DriverName { get; set; }
        public string? VehicleLedgerAc { get; set; }
        public bool Selected { get; set; }
    }
}
