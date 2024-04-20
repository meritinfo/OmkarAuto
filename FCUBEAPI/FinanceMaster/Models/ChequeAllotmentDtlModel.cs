namespace FinanceMasters.Models
{
    public class ChequeAllotmentDtlModel
    {
        public string? ChequeID { get; set; }
        public string? ChequeAllotId { get; set; }
        public string? BankCode { get; set; }
        public string? BranchCode { get; set; }
        public string? ChequeNo { get; set; }
        public string? CheqStatus { get; set; }
        public string? ChqValue { get; set; }
        public string? ChqUsedValue { get; set; }
        public string? CancelRemarks { get; set; }
        public string? CancelBy { get; set; }
        public string? CancelDate { get; set; }
        public string? CancelChqAttach { get; set; }
        public string? CheqValDefinedBy { get; set; }
        public string? CheqValDefinedDate { get; set; }
        public string? CheqValModifiedBy { get; set; }
        public string? CheqValModifiedDate { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
