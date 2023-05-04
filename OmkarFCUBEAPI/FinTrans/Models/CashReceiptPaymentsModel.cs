namespace FinTrans.Models
{
    /// <summary>
    /// CashRecevedPaymentsModel class model for CashRecevedPayments
    /// </summary>
    public class CashReceiptPaymentsModel
    {
        public string? FtdID { get; set; }
        public string? FtmID { get; set; }
        public string? FtmDate { get; set; }
        public string? SlNo { get; set; }
        public string? TypeSign { get; set; }
        public string? Amount { get; set; }
        public string? AccountID { get; set; }
        public string? Narration { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDate { get; set; }
        public string? BankRefNo { get; set; }
        public string? CostRefType { get; set; }
        public string? CostRefNo { get; set; }
        public string? Reference { get; set; }
        public string? CostCode { get; set; }
        public string? ClearDate { get; set; }
        public string? BranchReconYN { get; set; }
        public string? AcctLedgerType { get; set; }
        public string? BranchCode { get; set; }
        public string? YearID { get; set; }
    }
}

