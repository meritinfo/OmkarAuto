using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class VehicleFltTypeGroupMstModel
    {
        public string? VehicleTypeGroupId { get; set; }
        public string? VehicleTypeGroupCode { get; set; }
        public string? VehicleTypeGroupName { get; set; }
        public string? IsActive { get; set; }

        public string? LoggedInUser { get; set; }
    }
}
