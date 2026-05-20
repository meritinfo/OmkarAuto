using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class VehicleFrtOutstandingRptModel
    {
        public string? Branch { get; set; }
        public string? VehicleNo { get; set; }
        public string? TripNo { get; set; }
        public string? LoadDate { get; set; }
        public string? ChallanNo { get; set; }
        public string? PartyName { get; set; }
        public string? FromPlace { get; set; }
        public string? ToPlace { get; set; }
        public string? TotalHire { get; set; }
        public string? RecdAmt { get; set; }
        public string? DedAmt { get; set; }
        public string? TdsAmt { get; set; }
        public string? DueAmt { get; set; }
        
    }
}
