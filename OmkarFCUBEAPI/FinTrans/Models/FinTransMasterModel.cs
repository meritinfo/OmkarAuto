namespace FinTrans.Models
{
    /// <summary>
    /// CashRecevedPaymentsModel class model for CashRecevedPayments
    /// </summary>
    public class FinTransMasterModel
    {
        public string? FtmID { get; set; }
        public string? FtmDate { get; set; }
        public string? DocType { get; set; }
        public string? DocSeries { get; set; }
        public string? DocNo { get; set; }
        public string? SeriesDoc { get; set; }
        public string? Remarks { get; set; }
        public string? RefType { get; set; }
        public string? RefNo { get; set; }
        public string? DocAmount { get; set; }
        public string? NeftPmt { get; set; }
        public string? UTRNo { get; set; }
        public string? ISDebitAdvice { get; set; }
        public string? DARefNo { get; set; }
        public string? AutoCreditFtmId { get; set; }
        public string? IsTdsEntry { get; set; }
        public string? LinkedYN { get; set; }
        public string? LinkedDoc { get; set; }
        public string? BranchCode { get; set; }
        public string? AuditYN { get; set; }
    
        public string? AuditDt { get; set; }
        public string? AuditBy { get; set; }
        public string? AuditRemarks { get; set; }
        public string? ModifyRemarks { get; set; }
        public string? YearID { get; set; }

    }
}

