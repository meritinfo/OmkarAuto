using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class BankReconcilationModel
    {
        public string FtdID { get; set; }
        public string FtmDate { get; set; }
        public string DocNo { get; set; }
        public string Debit { get; set; }
        public string Credit { get; set; }
        public string ChequeNo { get; set; }
        public string ChequeDate { get; set; }
        public string Narration { get; set; }
        public string SubAccountName { get; set; }
        public string ClearDate { get; set; }
    }
}
