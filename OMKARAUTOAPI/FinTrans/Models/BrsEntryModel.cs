using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public  class BrsEntryModel
    {
        public string? TransId { get; set; }
        public string? TransDate { get; set; }
        public string? BankAc { get; set; }
        public string? DocNo{ get; set; }
        public string? DebitRs { get; set; }
        public string? CreditRs { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDate { get; set; }
        public string? Narration { get; set; }
        public string? ClearDate { get; set; }
        public string? YearId { get; set; }
        public string? Typesign { get; set; }
        public string? OtherAc { get; set; }
        public string? AmountRs { get; set; }
        public string? BranchCode { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }

        public string? LoggedInUser { get; set; }


    }
}
