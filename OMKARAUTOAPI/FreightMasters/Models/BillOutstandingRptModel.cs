using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class BillOutstandingRptModel
    {
        public string? PartyName { get; set; }
        public string? Ref { get; set; }
        public string? RefNo { get; set; }
        public string? RefDate { get; set; }
        public string? SubDate { get; set; }
        public string? BillAge { get; set; }
        public string? BillAmount { get; set; }
        public string? RecdAmount { get; set; }
        public string? DedAmount { get; set; }
        public string? TdsAmount { get; set; }
        public string? DueAmount { get; set; }
        public string? OnAccount { get; set; }
        public string? NetDue { get; set; }

    }
}
