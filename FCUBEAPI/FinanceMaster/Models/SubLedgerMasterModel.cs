using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Models
{
    public class SubLedgerMasterModel
    {
        public string? SubLedgerId { get; set; }
        public string? LedgerAc { get; set; }
        public string? CreateOrPredefined { get; set; }
        public string? PreDefinedQuery { get; set; }
        public string? ValidateWithDocNo { get; set; }
        public string? ValidateTable { get; set; }
        public string? ValidateTableField { get; set; }
        public string? LoggedInUser{ get; set; }
        public List<SubLedgerMasterDtlListmodel>? SubLedgerMasterDtlList { get; set; }


    }
    public class SubLedgerMasterDtlListmodel
    {
        public string? TyreId { get; set; }
        public string? SubLedgerDtlId { get; set; }
        public string? SubLedgerId { get; set; }
        public string? LedgerAc { get; set; }
        public string? SubLedgerDesc { get; set; }
       
      
    }
}
