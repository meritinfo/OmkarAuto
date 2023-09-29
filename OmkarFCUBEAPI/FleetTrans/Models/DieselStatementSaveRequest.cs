namespace FleetTrans.Models
{
    public class DieselStatementSaveRequest
    {
        public string StatementBranch { get; set; }
        public string StatementDate { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Vendor { get; set; }
        public string Remarks { get; set; }
        public string TotalDslLtrs { get; set; }
        public string TotalCashAdv { get; set; }
        public string TotalNetAmount { get; set; }
        public string BranchCode { get; set; }
        public string YearId { get; set; }
        public string LoggedInUser { get; set; }
        public List<DieselStatementSearchModel> DieselStatementListData { get; set; }
    }
}
