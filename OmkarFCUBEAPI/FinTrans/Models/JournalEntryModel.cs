using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Models
{
     public class JournalEntryModel
    {
        public string? FtmID { get; set; }
        public string? FtmDate { get; set; }
        public string? DocType { get; set; }
        public string? DocSeries { get; set; }
        public string? DocNo { get; set; }
        public string? SeriesDoc { get; set; }
        public string? Remarks { get; set; }
        public string? RefType { get; set; }
        public string? RefNo { get; set; }
        public string? DocAmount { get; set; }
        public string? LinkedYN { get; set; }
        public string? ModifyRemarks { get; set; }
        public string? YearID { get; set; }

        public string? BranchCode { get; set; }

        public string? LoggedInUser { get; set; }
        public List<JournalEntryDetailModel>? DetailList { get; set; }

    }
    public class JournalEntryDetailModel
    {
        public string? FtdID { get; set; }
        public string? FtmID { get; set; }
        public string? FtmDate { get; set; }
        public string? SlNo { get; set; }
        public string? TypeSign { get; set; }
        public string? Amount { get; set; }
        public string? AccountID { get; set; }
        public string? Narration { get; set; }
        public string? CostRefNo { get; set; }
        public string? Reference { get; set; }
        public string? BranchCode { get; set; }



    }
}
