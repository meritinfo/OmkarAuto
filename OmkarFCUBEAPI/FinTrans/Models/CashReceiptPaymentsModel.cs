using System.Reflection.PortableExecutable;

namespace FinTrans.Models
{
    /// <summary>
    /// CashRecevedPaymentsModel class model for CashRecevedPayments
    /// </summary>
    public class CashReceiptPaymentsModel
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
        public string? LinkedYN { get; set; }
        public string? NeftPmt { get; set; }
        public string? UTRNo { get; set; }
        public string? ModifyRemarks { get; set; }
        public string? YearID { get; set; }
        public string? AcHeader { get; set; }
        public string? AccountOf { get; set; }
        public string? Narration { get; set; }
        public string? BranchCode { get; set; }
        public string? LoggedInUser { get; set; }
        public List<CashReceiptPaymentDetailModel>? DetailList { get; set; }

    }
    public class CashReceiptPaymentDetailModel
    {
        public string? SlNo { get; set; }
        public string? TypeSign { get; set; }
        public string? Amount { get; set; }
        public string? AccountID { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDate { get; set; }
        public string? Narration { get; set; }
        public string? Reference { get; set; }
    }
}

