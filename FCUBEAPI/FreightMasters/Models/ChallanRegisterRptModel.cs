using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class ChallanRegisterRptModel
    {
        public string? ChBookStnname { get; set; }
        public string? ChallanNo { get; set; }
        public string? ChStatus { get; set; }
        public string? ChallanDateTime { get; set; }
        public string? ExpArrivalDate { get; set; }
        public string? FromPlaceName { get; set; } 
        public string? ToPlaceName { get; set; }
        public string? BrokerName { get; set; }
        public string? TruckNo { get; set; }
        public string? VehicleOwnerName { get; set; }
        public string? TotalHire { get; set; }
        public string? TotalAdvance { get; set; }
        public string? Balance { get; set; } //  
        public string? BalPayAtBrName { get; set; }
        public string? LrNo { get; set; }
    }
}
