using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class TrailBalModel
    {
        public string? AccountID { get; set; }
        public string? AccountLedgerType { get; set; }
        public string? MainGroup { get; set; }
        public string? SubGroup { get; set; }
        public string? AccountName { get; set; }
        public string? DEBIT { get; set; }
        public string? CREDIT { get; set; }
        public string? BalAmt { get; set; }

    }
}
