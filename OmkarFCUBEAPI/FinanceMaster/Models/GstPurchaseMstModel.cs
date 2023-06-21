using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Models
{
    public class GstPurchaseMstModel
    {
        public string? Masterid { get; set; }
        public string? TransDate { get; set; }
        public string? BranchCode { get; set; }
        public string? GstType { get; set; }
        public string? PmtType { get; set; }
        public string? VendorId { get; set; }
        public string? VendorName { get; set; }
        public string? VendorAddress { get; set; }
        public string? VendorState { get; set; }
        public string? VendorGstNo { get; set; }
        public string? VendorInvNo { get; set; }
        public string? VendorInvDt { get; set; }
        public string? TotalItemAmt { get; set; }
        public string? TotalSgstAmt { get; set; }
        public string? TotalCgstAmt { get; set; }
        public string? TotalIgstAmt { get; set; }
        public string? TotalAmount { get; set; }
        public string? TDSAmt { get; set; }
        public string? OtherDedAmt { get; set; }
        public string? RoundOff { get; set; }
        public string? NetAmount { get; set; }
        public string? CreditAc { get; set; }
        
        public string? TdsAc { get; set; }
        public string? NeftPmt { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDate { get; set; }
        public string? Findocid { get; set; }
        public string? FindocidJV { get; set; }
        public string? FindocidOpp { get; set; }
        public string? FindocidJVOpp { get; set; }
        public string? YearId { get; set; }
        public string? BeneficiaryId { get; set; }
        public string? VerifiedYN { get; set; }

        public string? VerifiedDt { get; set; }
        public string? VerifiedBy { get; set; }
        public string? ApprovedYN { get; set; }
        public string? ApprovedDt { get; set; }
        public string? ApprovedBy { get; set; }
        public string? DownloadYN { get; set; }
        public string? DownloadDt { get; set; }
        public string? DownloadBy { get; set; }
        public string? BankPmtAppRejYN { get; set; }
        public string? BankPmtAppRejDt { get; set; }
        public string? BankPmtAppRejBy { get; set; }

        public string? ActLinkedYN { get; set; }
        public string? ActLinkedDt { get; set; }
        public string? ActLinkedBy{ get; set; }
        public string? AttatchFile1 { get; set; }
        public string? AttatchFile2 { get; set; }
        public string? ModifyRemarks { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? LoggedInUser { get; set; }

    }
}
