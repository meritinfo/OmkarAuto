

namespace FinTrans.Models
{
    public class GstPurchaseMstModel
    {
        public string? Masterid { get; set; }
        public string? TransDate { get; set; }
        public string? BranchCode { get; set; }
        public string? BranchName { get; set; }
        public string? PmtType { get; set; }
        public string? VendorId { get; set; }
        public string? VendorName { get; set; }
        public string? VendorInvNo { get; set; }
        public string? VendorInvDt { get; set; }
        public string? InputEligible { get; set; }
        public string? TotalItemAmt { get; set; }
        public string? TotalSgstAmt { get; set; }
        public string? TotalCgstAmt { get; set; }
        public string? TotalIgstAmt { get; set; }
        public string? TotalAmount { get; set; }
        public string? TDSAmt { get; set; }
        public string? RoundOff { get; set; }
        public string? NetAmount { get; set; }
        public string? CreditAc { get; set; }   
        public string? NeftPmt { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDate { get; set; }
        public string? YearId { get; set; }
        public string? AttatchFile1 { get; set; }
        public string? AttatchFile2 { get; set; }
        public string? ModifyRemarks { get; set; }
        public string? LoggedInUser { get; set; }
        public List<GstPurchaseDtlModel> GstPurchaseDetailsList { get; set; }

    }
}
