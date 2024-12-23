using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class SparesLubesMasterModel
    {
        public string? SpareLubId { get; set; }
        public string? SpareLubName { get; set; }
        public string? SpareLubType { get; set; }
        public string? Sch_Oth { get; set; }
        public string? LifeType { get; set; }
        public string? LifeExpectancy { get; set; }
        public string? IsActive { get; set; }
        public string? stype { get; set; }
        public string? InventroyYN { get; set; }
        public string? OpeningQty { get; set; }
        public string? OpeningValue { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
