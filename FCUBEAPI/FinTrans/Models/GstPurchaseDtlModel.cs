

namespace FinTrans.Models
{
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
