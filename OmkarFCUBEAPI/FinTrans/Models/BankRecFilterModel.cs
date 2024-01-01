using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class BankRecFilterModel
    {
        public string FromDate{ get; set; }
        public string ToDate { get; set; }
        public string Accountid{ get; set; }
        public string Reconcile { get; set; }
        public string Inclopening { get; set; }
    }
}
