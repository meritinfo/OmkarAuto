using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class DriverSalarySearchListRequest
    {
        public int NewTripDate { get; set; }
        public int FromDate { get; set; }
        public int ToDate { get; set; }
        public int VehicleMasterID { get; set; }
        public int DriverMasterID { get; set; }
    }
}
