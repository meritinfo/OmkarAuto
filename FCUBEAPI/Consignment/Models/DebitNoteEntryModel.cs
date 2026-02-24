using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class DebitNoteEntryModel
    {
        public string? DnId { get; set; }
        public string? DnBranch { get; set; }
        public string? DnSlNo { get; set; }
        public string? DnDate { get; set; }
        public string? DnRefNo { get; set; }
        public string? DnRefDate { get; set; }
        public string? DnRemarks { get; set; }
        public string? DebitAmt { get; set; }
        public string? GstType { get; set; }
        public string? GstPct { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstAmt { get; set; }
        public string? TotalDebitAmt { get; set; }
        public string? DebitAc { get; set; }
        public string? CreditAc { get; set; }
        public string? Yearid { get; set; }
        public string? brname { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
