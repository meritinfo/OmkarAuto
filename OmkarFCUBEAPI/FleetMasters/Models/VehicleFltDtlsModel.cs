using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class VehicleFltDtlsModel
    {
        public string? DetailID { get; set; }
        public string? VehicleMasterID { get; set; }
        public string? ValidFrom { get; set; }
        public string? ValidTo { get; set; }
        public string? VehicleAvgLoad { get; set; }
        public string? VehicleAvgEmpty { get; set; }
        public string? AdBlue { get; set; }
        public string? Index { get; set; }
    }
}
