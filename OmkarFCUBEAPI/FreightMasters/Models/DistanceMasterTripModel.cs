using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class DistanceMasterTripModel
    {
        public string? MasterID { get; set; }
        public string? ValidFrom { get; set; }
        public string? ValidUpto { get; set; }
        public string? FromLocation { get; set; }
        public string? LoggedInUser { get; set; }
        public List<DistanceDetailTripModel> DistanceDetailsTripList { get; set; }
    }
}
