using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class CreditNoteEntryModel
    {
        public string? CnId { get; set; }
        public string? CnBranch { get; set; }
        public string? CnDate { get; set; }
        public string? CnSlNo { get; set; }
        public string? CnAgainst { get; set; }
        public string? PartyId { get; set; }
        public string? BillYear { get; set; }
        public string? BillingStation { get; set; }
        public string? BillSeries { get; set; }
        public string? BillSlNo { get; set; }
        public string? BillDate { get; set; }
        public string? BillType { get; set; }
        public string? BillsMasterId { get; set; }
        public string? BillGstBy { get; set; }
        public string? BillGstType { get; set; }
        public string? BillGstPct { get; set; }
        public string? BillTaxableAmt { get; set; }
        public string? BillSgstAmt { get; set; }
        public string? BillCgstAmt { get; set; }
        public string? BillIgstAmt { get; set; }
        public string? TotalBillAmount { get; set; }
        public string? SacCode { get; set; }
        public string? FullPartReBill { get; set; }
        public string? CnCreditAmt { get; set; }
        public string? CnSgstAmt { get; set; }
        public string? CnCgstAmt { get; set; }
        public string? CnIgstAmt { get; set; }
        public string? TotalCreditAmt { get; set; }
        public string? CreditNoteRemarks { get; set; }
        public string? FinDocid { get; set; }
        public string? DebitAc { get; set; }
        public string? YearId { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
