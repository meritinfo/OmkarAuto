namespace FleetTrans.Models
{
    public class DieselStatementSearchListRequest
    {
        public string StatementBranch { get; set; }
        public string StatementDate { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Vendor { get; set; }
    }
}
