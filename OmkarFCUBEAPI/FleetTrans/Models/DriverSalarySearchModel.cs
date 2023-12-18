using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class DriverSalarySearchModel
    {
        public string? DetailId { get; set; }
        public string? MasterId { get; set; }
        public string? VehicleMasterId { get; set; }
        public string? DriverMasterId { get; set; }
        //public string? SalDays { get; set; }
      
        public string? FromDt { get; set; }
        public string? ToDt { get; set; }
        public string? VehicleNo { get; set; }
        public string? DriverName { get; set; }
        public string? SalaryDays { get; set; }
        public string? SalaryAmt { get; set; }
        public string? PoolAmt { get; set; }
        public string? NetPayable { get; set; }
        public string? LastTripBal { get; set; }
        public string? LastTripDt { get; set; }

        public string? VehicleLedgerAc { get; set; }
        public bool Selected { get; set; }
    }
}
