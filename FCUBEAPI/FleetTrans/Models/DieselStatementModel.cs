using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class DieselStatementModel
    {
        public string? MasterID { get; set; }
        public string? DfVendor { get; set; }
        public string? Vendor { get; set; }
        public string? BillStmtNo { get; set; }
        public string? BillStmtDate { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public string? Findocid { get; set; }
        public string? Location { get; set; }
        public string? Rate { get; set; }
        public string? StatementFlag { get; set; }
        public string? Remarks { get; set; }
        public string? TotalDslLtrs { get; set; }
        public string? GrossDslAmt { get; set; }
        public string? DiscRateLtr { get; set; }
        public string? DiscAmt { get; set; }
        public string? TotalDslAmt { get; set; }
        public string? TdsRate { get; set; }
        public string? TdsAmt { get; set; }
        public string? TotalCashAdv { get; set; }
        public string? TotalNetAmount { get; set; }      
        public string? BranchCode { get; set; }
        public string? YearId { get; set; }
        public string? DriverId{ get; set; }
        public string? FromLoc { get; set; }
        public string? ToLoc { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? LoggedInUser { get; set; }
        public List<DieselStatementSearchModel> DieselStatementListData { get; set; }
        public List<DieselStmtDtlsModel> DieselStmtDtlsList { get; set; }
    }
}
