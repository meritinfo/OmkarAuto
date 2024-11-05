using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class AddCostRecMstModel
    {
        public string? MasterID { get; set; }
        public string? BranchCode { get; set; }
        public string? TransNo { get; set; }
        public string? TransDate { get; set; }
        public string? AddCostID { get; set; }
        public string? AddCostDescription { get; set; }
        public string? AddCostType { get; set; }
        public string? ManualOrDateRange { get; set; }
        public string? DocumentType { get; set; }
        public string? DocBranch { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public string? TotalAmount { get; set; }
        public string? DivisionOption { get; set; }
        public string? PartyOption { get; set; }
        public string? PartyCode { get; set; }
        public string? CostTot { get; set; }
        public string? OthTot { get; set; }
        public string? GrossTot { get; set; }
        public string? TdsRate { get; set; }
        public string? TdsAmt { get; set; }
        public string? NetTot { get; set; }
        public string? Remarks { get; set; }
        public string? OthDbCrAc { get; set; }
        public string? TdsAc { get; set; }
        public string? ApprovedYN { get; set; }
        public string? RpType { get; set; }
        public string? NeftPmt { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDate { get; set; }
        public string? FinDocID { get; set; }
        public string? FinDocIdJV { get; set; }
        public string? BeneficiaryId { get; set; }
        public string? AttatchFile1 { get; set; }
        public string? AttatchFile2 { get; set; }
        public string? ModifyRemarks { get; set; }
        public string? YearId { get; set; }
        public string? LoggedInUser { get; set; }
        public string? Branch { get; set; }
        public string? AddCostTp { get; set; }
        public List<AddCostRecDtlModel> AddCostRecDtlList { get; set; }

    }
}
