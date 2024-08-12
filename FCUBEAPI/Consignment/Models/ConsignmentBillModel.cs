

namespace Consignment.Models
{
    public class ConsignmentBillModel
    {
        public string? BillingStation { get; set; }
        public string? BillNo { get; set; }
        public string? BillDate { get; set; }
        public string? BillType { get; set; }
        public string? DueDate { get; set; }
        public string? CollBranch { get; set; }
        public string? PartyGstLocation { get; set; }
        public string? Freight { get; set; }
        public string? Others { get; set; }
        public string? SubTotal { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstAmt { get; set; }
        public string? Gtotal { get; set; }
    }
}
