using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class SparesPurchaseMasterModel
    {
        public string? SpTransId { get; set; }
        public string? TransDate { get; set; }
        public string? NonVendor { get; set; }
        public string? VendorId { get; set; }
        public string? VendorInvDt { get; set; }
        public string? VendorInvNo { get; set; }
        public string? VendorName { get; set; }
        public string? VendorAddress { get; set; }
        public string? VendorState { get; set; }
        public string? VendorGstNo { get; set; }
        public string? GstType { get; set; }
        public string? TotItemAmount { get; set; }
        public string? TotSgstAmt { get; set; }
        public string? TotCgstAmt { get; set; }
        public string? TotIgstAmt { get; set; }
        public string? TotItemNetAmount { get; set; }
        public string? OtherAmount { get; set; }
        public string? RoundOff { get; set; }
        public string? NetAmount { get; set; }
        public string? Remarks { get; set; }
        public string? PmtType { get; set; }
        public string? CreditAc { get; set; }
        public string? NeftPmt { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDate { get; set; }
        public string? LinkFtmId { get; set; }
        public string? LinkJVFtmId { get; set; }
        //public string? AuditedYN { get; set; }
        //public string? AuditDate { get; set; }
        //public string? AuditedBy { get; set; }
        public string? RefDocAttachedImage { get; set; }
        public string? BranchCode { get; set; }
        public string? YearID { get; set; }
        public string? GodownId { get; set; }
        public string? GstInputTaken { get; set; }

        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }

        public string? LoggedInUser { get; set; }

   
        public List<SparesPurchaseDtlListmodel>? SparesPurchaseDtlList { get; set; }
    }
    public class SparesPurchaseDtlListmodel
    {
        public string? SpTransDtlId { get; set; }
        public string? SpTransId { get; set; }
        public string? TransDate { get; set; }
        public string? SpareLubId { get; set; }
        public string? BrandId { get; set; }
        public string? ItemQty { get; set; }
        public string? ItemRate { get; set; }
        public string? ItemAmount { get; set; }
        public string? SgstPct { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstPct { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstPct { get; set; }
        public string? IgstAmt { get; set; }
        public string? NetAmount { get; set; }
        public string? Remarks { get; set; }
       
        
    }
}
