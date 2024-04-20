
namespace FleetTrans.Models
{
    public class BillStatementSaveRequest
    {
        public string? BillingParty { get; set; }
        public string? FromPlace { get; set; }
        public string? ToPlace { get; set; }
        public string? CnorPlantCode { get; set; }
        public string? ProductId { get; set; }
        public string? TotFreight { get; set; }
        public string? TotExtraChrg { get; set; }
        public string? TotSubTotal { get; set; }
        public string? GstType { get; set; }
        public string? SgstPct { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstPct { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstPct { get; set; }
        public string? IgstAmt { get; set; }
        public string? TotalBillAmt { get; set; }
        public string? LoggedInUser { get; set; }
        public List<BillStatementSearchModel> BillStatementListData { get; set; }
    }
}
