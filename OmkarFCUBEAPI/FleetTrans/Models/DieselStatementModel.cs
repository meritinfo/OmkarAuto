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
        public string? BillStmtNo { get; set; }
        public string? BillStmtDate { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public string? Location { get; set; }
        public string? Remarks { get; set; }
        public string? TotalDslLtrs { get; set; }
        public string? TotalCashAdv { get; set; }
        public string? TotalDslAmt { get; set; }
        public string? TotalNetAmount { get; set; }
        public string? BranchCode { get; set; }
        public string? YearId { get; set; }
    }
}
