using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class DeliveryDisputeEntryModel
    {
        public string? DisputeId { get; set; }
        public string? DispBranch { get; set; }
        public string? DispDate { get; set; }
        public string? DispSlNo { get; set; }
        public string? GcYear { get; set; }
        public string? GcBook { get; set; }
        public string? GcNoteNo { get; set; }
        public string? ConsignmentId { get; set; }
        public string? YearId { get; set; }
        public string? DisputeStatus { get; set; }
        public string? DisputeRemarks { get; set; }
        public string? DispAttach { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
