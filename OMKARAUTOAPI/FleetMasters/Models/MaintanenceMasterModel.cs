using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class MaintanenceMasterModel
    {
        public string? MaintId { get; set; }
        public string? MaintenanceDesc { get; set; }
        public string? MaintType { get; set; }
        public string? IsActive { get; set; }

        public string? LoggedInUser { get; set; }

    }
}
