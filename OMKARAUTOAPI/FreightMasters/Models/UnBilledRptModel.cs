using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class UnBilledRptModel
    {
        public string? BookingStnName { get; set; }
        public string? GcNoteNo { get; set; }
        public string? BookingDate { get; set; }
        public string? FromStnName { get; set; }
        public string? ToStnName { get; set; }
        public string? BillStnName { get; set; } 
        public string? Consignor { get; set; }
        public string? Consignee { get; set; }
        public string? PartyName { get; set; }
        public string? TruckNo { get; set; }
        public string? FreightRs { get; set; }
        public string? GtotalRs { get; set; }
        public string? BilledAmt { get; set; }
        public string? ContainerNo { get; set; }


    }
}
