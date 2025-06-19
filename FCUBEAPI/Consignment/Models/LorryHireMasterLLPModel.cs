using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class LorryHireMasterLLPModel
    {
        public string? MasterId { get; set; }
        public string? PmtStation { get; set; }
        public string? PmtNo { get; set; }
        public string? PmtDate { get; set; }
        public string? PmtType { get; set; }
        public string? OnAcBranchYN { get; set; }
        public string? OnAcBranch { get; set; }
        public string? CardId { get; set; }
        public string? ChequePayeeName { get; set; }
        public string? BenId { get; set; }
        public string? TotalHireAmt { get; set; }
        public string? TotalHamaliAmt { get; set; }
        public string? TotalDetenAmt { get; set; }
        public string? TotalOtherAmt { get; set; }
        public string? TotalOther2Amt { get; set; }
        public string? TotalOther3Amt { get; set; }
        public string? TotalNetAmt { get; set; }
        public string? TotalRecoveryAmt { get; set; }
        public string? TotalLhpmAmt { get; set; }
        public string? TotalOthDedAmt { get; set; }
        public string? TotalOth2DedAmt { get; set; }
        public string? TotalTdsAmt { get; set; }
        public string? CreditAc { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDt { get; set; }
        public string? NeftPmt { get; set; }
        public string? Remarks { get; set; }
        public string? FinDocid { get; set; }
        public string? FinDocidJV { get; set; }
        public string? FindocIdOpp { get; set; }
        public string? YearId { get; set; }
        public string? ModifyRemarks { get; set; }
        public string? PmtStn { get; set; }
        public string? PmtTp { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }

        public string? LoggedInUserID { get; set; }
        public List<LorryHireDetailLLPModel> LhpmDetails { get; set; }
    }
}
