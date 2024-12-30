using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class OutstandingAnalRptModel
    {
        public string? Year { get; set; }
        public string? Party { get; set; }
        public string? BilledDueAmt { get; set; }
        public string? AdhocRecd { get; set; }
        public string? ActualBillDue { get; set; }
        public string? LedgerAmt { get; set; } 
        public string? TotalUnbilledAmt { get; set; } 
    }
}
