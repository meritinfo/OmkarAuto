using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class LedgerDetailModel
    {
        public string? FtmDate { get; set; }
        public string? DocType { get; set; }
 
        public string? DocNo { get; set; }
        public string? DrAmt { get; set; }
        public string? CrAmt { get; set; }
        public string? Narration { get; set; }
        public string? RefType { get; set; }
    }
}
