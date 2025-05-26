using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class BrokerAdvancePmtModel
    {
        public string? AdvPmtid { get; set; }
        public string? BranchCode { get; set; }
        public string? PmtNo { get; set; }
        public string? PmtDate { get; set; }
        public string? BrokerId { get; set; }
        public string? AdvanceAmt { get; set; }
        public string? Remarks { get; set; }
        public string? Attachment1 { get; set; }
        public string? PmtType { get; set; }
        public string? NeftYN { get; set; }
        public string? CreditAc { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDt { get; set; }
        public string? FinDocid { get; set; }
        public string? YearId { get; set; }
        public string? ModifyRemarks { get; set; }
        public string? AdvanceAdjAmt { get; set; }
        public string? branch { get; set; }
        public string? broker{ get; set; }
        public string? LoggedInUser { get; set; }
    }
}
