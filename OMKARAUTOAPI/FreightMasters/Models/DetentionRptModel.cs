using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class DetentionRptModel
    {
        public string? BookingPlace { get; set; }
        public string? Party { get; set; }
        public string? GcNoteNo { get; set; }
        public string? BookingDate { get; set; }
        public string? FromPlace { get; set; }
        public string? ToPlace { get; set; }
        public string? TruckNo { get; set; }
        public string? ChallanNo { get; set; }
        public string? OriginDetn { get; set; }
        public string? DestDetn { get; set; }
        public string? Paid { get; set; }        
  
    }
}
