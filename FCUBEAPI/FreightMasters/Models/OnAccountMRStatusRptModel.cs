using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class OnAccountMRStatusRptModel
    {
        public string? MrStn { get; set; }
        public string? MrNo { get; set; }
        public string? MrDate { get; set; }
        public string? PartyName { get; set; }
        public string? CrAdviceNo { get; set; }
        public string? OnAcAmt { get; set; }
        public string? OnAcStatus { get; set; }
        public string? MrType { get; set; }
        public string? OnAcAdjAmt { get; set; }
        public string? PendingAdjAmt { get; set; }
        public string? AdjInmr { get; set; }
        public string? AdjMrdate { get; set; }
        public string? AdjAmt { get; set; }
        public string? AsOndate { get; set; }
    }
}
