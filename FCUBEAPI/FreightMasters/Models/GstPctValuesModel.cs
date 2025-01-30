using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class GstPctValuesModel
    {
        public string? Id { get; set; }
        public string? ValidFrom { get; set; }
        public string? RoadFrtGst { get; set; }
        public string? RailFrtGst { get; set; }
        public string? CoastalFrtGst { get; set; }
        public string? HamaliGst { get; set; }
        public string? DetentionGst { get; set; }
        public string? OtherChargesGst { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
