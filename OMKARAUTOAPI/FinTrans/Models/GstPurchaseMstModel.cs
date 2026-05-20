

namespace FinTrans.Models
{
    public class GstPurchaseMstModel
    {
        public string? Masterid { get; set; }
        public string? TransDate { get; set; }
        public string? BranchCode { get; set; }
        public string? BranchName { get; set; }
        public string? GstType { get; set; }
        public string? PmtType { get; set; }
        public string? Findocid { get; set; }
        public string? NoVender { get; set; }
        public string? VendorId { get; set; }
        public string? VendorName { get; set; }
        public string? VendorAddress { get; set; }
        public string? VendorState { get; set; }
        public string? VendorGST { get; set; }
        public string? VendorInvNo { get; set; }
        public string? VendorInvDt { get; set; }
        public string? InputEligible { get; set; }
        public string? TotalItemAmt { get; set; }
        public string? TotalSgstAmt { get; set; }
        public string? TotalCgstAmt { get; set; }
        public string? TotalIgstAmt { get; set; }
        public string? TotalAmount { get; set; }
        public string? TDSAmt { get; set; }
        public string? TdsAc { get; set; }
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
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? LoggedInUser { get; set; }
        public List<GstPurchaseDtlModel> GstPurchaseDetailsList { get; set; }

    }

    public class GstPurchaseDtlModel
    {
        public string? Masterid { get; set; }
        public string? DebitAc { get; set; }
        public string? Narration { get; set; }
        public string? SacHsnCode { get; set; }
        public string? SubLedger { get; set; }
        public string? ItemAmt { get; set; }
        public string? SgstPct { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstPct { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstPct { get; set; }
        public string? IgstAmt { get; set; }
        public string? TotAmount { get; set; }
        public string? RefDocNo { get; set; }
    }
}
