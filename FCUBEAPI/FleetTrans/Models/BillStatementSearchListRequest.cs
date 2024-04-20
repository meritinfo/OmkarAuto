namespace FleetTrans.Models
{
    public class BillStatementSearchListRequest
    {
        public string BillingParty { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string FromPlace { get; set; }
        public string ToPlace { get; set; }
        public string CnorPlantCode { get; set; }
    }
}
