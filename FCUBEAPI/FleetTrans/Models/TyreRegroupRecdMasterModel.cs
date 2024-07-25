using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TyreRegroupRecdMasterModel
    {
        public string RegroupRecdMasterID { get; set; }
        public string RecdDate { get; set; }
        public string VendorId { get; set; }
        public string? VendorName { get; set; }
        public string VendorBillNo { get; set; }
        public string VendorBillDt { get; set; }
        public string Remarks { get; set; }
        public string TotalAmt { get; set; }
        public string SgstPct { get; set; }
        public string SgstAmt { get; set; }
        public string CgstPct { get; set; }
        public string CgstAmt { get; set; }
        public string IgstPct { get; set; }
        public string IgstAmt { get; set; }
        public string OtherAmt { get; set; }
        public string SubTotal { get; set; }
        public string RoundOffAmt { get; set; }
        public string NetBillAmt { get; set; }
        public string PmtType { get; set; }
        public string FinDocID { get; set; }
        public string ChequeNo { get; set; }
        public string ChequeDt { get; set; }
        public string CreditAc { get; set; }
        public string AttatchFile { get; set; }
        public string BranchCode { get; set; }
        public string YearID { get; set; }
        public string? LoggedInUser { get; set; }
        public List<TyreRegroupRecdDtlListmodel>? TyreRegroupRecdDtlList { get; set; }
    }
    public class TyreRegroupRecdDtlListmodel
    {
        public string? RegroupRecdMasterID { get; set; }      
        public string? BrandId { get; set; }
        public string? TyreId { get; set; }
        public string? RegroupDoneYN { get; set; }
        public string? RegroupAmount { get; set; }
        public string? Remarks { get; set; }
        public string? RegroupIssueDtlId { get; set; }   
    }
}
