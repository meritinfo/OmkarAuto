namespace Consignment.Models
{
    public class DirectPmtModel
    {
        public string? DtlId { get; set; }
        public string? PmtNo { get; set; }
        public string? PmtDate { get; set; }  
        public string? HireAmt { get; set; }
        public string? NetAmt { get; set; }                      
        public string? BankCoCode { get; set; }
        public string? BankPrCode { get; set; }
        public string? Ptype { get; set; }
        public string? BankAcNo { get; set; }
        public string? BenName { get; set; }        
        public string? BenBankIfsc { get; set; }
        public string? BenBankAcNo { get; set; }
        public string? BankCoName { get; set; }
        public string? Narr { get; set; }
        public string? Remarks { get; set; }
        public string? LoggedInUser { get; set; }
        public bool Selected { get; set; }
    }
}
