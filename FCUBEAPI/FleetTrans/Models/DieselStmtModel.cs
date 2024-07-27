using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class DieselStmtModel
    {
        public string? DfMasterID { get; set; }
        public string? DfAccount { get; set; }
        public string? AccountName { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public string? StmtDate { get; set; }
        public string? FtmidHsd { get; set; }
        public string? Remarks { get; set; }
        public string? TotalDslLtrs { get; set; }
        public string? TotalDslAmt { get; set; }  
        public string? BranchCode { get; set; }
        public string? YearId { get; set; }
        public string? LoggedInUser { get; set; }
        public List<DieselStmtDtlsModel> DieselStmtDtlsList { get; set; }
    }
}
