using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
    public class PlTransferModel
    {

        public string? TfrBranch {  get; set; }
        public string? TfrYear {  get; set; }
        public string? TfrPLAmt {  get; set; }
        public string? TfrTotalDrAmt {  get; set; }
        public string? TfrTotalCrAmt {  get; set; }
        public string? LoggedInUser {  get; set; }
        public string? PLAccount {  get; set; }
        public List<PlTransferDetails> PlTransferDetails { get; set; }
    }

    public class PlTransferDetails
    {
        public string? TfrId { get; set; }
        public string? AccountName { get; set; }
        public string? AccountId { get; set; }
        public string? DrAmt { get; set; }
        public string? CrAmt { get; set; }
    }
}



