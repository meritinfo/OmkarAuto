namespace FleetTrans.Models
{
    public class BillStatementSearchListRequest
    {
        public string BillingParty { get; set; }
        public string FromPlace { get; set; }
        public string ToPlace { get; set; }
        public string CnorPlantCode { get; set; }
        public string ProductId { get; set; }
    }
}
