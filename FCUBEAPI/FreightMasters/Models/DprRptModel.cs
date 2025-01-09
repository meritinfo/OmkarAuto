using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class DprRptModel
    {
        public string? GcNoteNo { get; set; }
        public string? OrderPerson { get; set; }
        public string? DprDate { get; set; }
        public string? PartyName { get; set; }
        public string? Fplace { get; set; }
        public string? Tplace { get; set; }
        public string? VehicleNo { get; set; }
        public string? VehOwnerName { get; set; }
        public string? DriverName { get; set; }
        public string? DriverMob1 { get; set; }
        public string? RateRs { get; set; }
        public string? FreightRs { get; set; }
        public string? TotFreightAmt { get; set; }
        public string? RatePerTon { get; set; }
        public string? LorryHire { get; set; }
        public string? AdvanceAmt { get; set; }
        public string? BalanceAmt { get; set; }
        public string? BrokerName { get; set; }
        public string? TrafficPerson { get; set; }
        public string? Remarks { get; set; }
    }
}
