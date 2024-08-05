using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class BookingRegisterRptModel
    {
        public string? BookedAt { get; set; }
        public string? BookingDate { get; set; }
        public string? BookingStatus { get; set; }
        public string? GcNoteNo { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public string? CnorName { get; set; }
        public string? EwayBillNo { get; set; }
        public string? EwayBillExpDate { get; set; }
        public string? CneeName { get; set; }
        public string? ProductName { get; set; }
        public string? FreightRs { get; set; }
        public string? SubTotalRs { get; set; }
        public string? GtotalRs { get; set; }
        public string? BusinessIncharge { get; set; }
        public string? BillingParty { get; set; }

    }
}
