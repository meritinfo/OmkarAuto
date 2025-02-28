

namespace Consignment.Models
{
    public class ConsignmentGstModel
    {
        public string? ConsignmentID { get; set; }
        public string? FreightId { get; set; }
        public string? Remarks { get; set; }
        public string? Amount { get; set; }
        public string? SgstPct { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstPct { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstPct { get; set; }
        public string? IgstAmt { get; set; }
        public string? TotalAmt { get; set; }
        public string? LinkColumn { get; set; }
    }
}
