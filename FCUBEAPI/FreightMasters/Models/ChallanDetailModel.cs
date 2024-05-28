using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class ChallanDetailModel
    {
        public string? ChallanDetId { get; set; }
        public string? ChallanId { get; set; }
        public string? ChallanFromStn { get; set; }
        public string? ChallanToStn { get; set; }
        public string? GcYear { get; set; }
        public string? GcBook { get; set; }
        public string? GcNoteNo { get; set; }
        public string? ConsignmentId { get; set; }
        public string? ChallanPkgs { get; set; }
        public string? ChallanWT { get; set; }
        public string? YearId { get; set; }
    }
}
