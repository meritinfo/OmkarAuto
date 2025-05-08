using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TyrePurchaseMasterModel
    {
        public string? PurchaseMasterID { get; set; } 
        public string? BranchCode { get; set; }
        public string? PurchaseDate { get; set; }   
        public string? PurchaseType { get; set; }
        public string? PurchaseTp { get; set; }
        public string? NoVendor { get; set; }
        public string? VendorId { get; set; }
        public string? VendorName { get; set; }
        public string? VendorAddress { get; set; }
        public string? VendorGstNo { get; set; }
        public string? VendorInvNo { get; set; }
        public string? VendorInvDt { get; set; }
        public string? TyreSacCode { get; set; }
        public string? GstType { get; set; }
        public string? GstInputTaken { get; set; }        
        public string? TotalTyresAmt { get; set; }
        public string? TotalSgstAmt { get; set; }
        public string? TotalCgstAmt { get; set; }
        public string? TotalIgstAmt { get; set; }
        public string? TotalAmt { get; set; }
        public string? RoundOff { get; set; }
        public string? NetAmount { get; set; }
        public string? Remarks { get; set; }
        public string? PmtType { get; set; }
        public string? NeftPmt { get; set; }
        public string? CreditAc { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDate { get; set; }    
        public string? Findocid { get; set; }
        public string? FindocidJV { get; set; }
        public string? RefDocAttachedImage { get; set; }
        public string? YearID { get; set; }
        public string? LoggedInUser { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }

        public List<TyrePurchaseDtlListmodel>? TyrePurchaseDtlList { get; set; }

    }
    public class TyrePurchaseDtlListmodel
    {
        public string? TyreId { get; set; }
        public string? PurchaseMasterID { get; set; }
        public string? PurchaseDate { get; set; }
        public string? BrandID { get; set; }
        public string? TyreNo { get; set; }
        public string? TyrePattern { get; set; }
        public string? TyreModel { get; set; }
        public string? TyreAmount { get; set; }
        public string? SgstPct { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstPct { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstPct { get; set; }
        public string? IgstAmt { get; set; }
        public string? NetTyreAmount { get; set; }
        public string? EstLifeKM { get; set; }
    }
}
