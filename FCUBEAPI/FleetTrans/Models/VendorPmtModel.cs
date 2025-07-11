using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class VendorPmtModel
    {
        public string? TransId { get; set; }
        public string? TransBranch { get; set; }
        public string? TransDate { get; set; }
        public string? BillsUptoDate { get; set; }
        public string? VendorId { get; set; }
        public string? Vendor { get; set; }   
        public string? TotalAmtPaid { get; set; }   
        public string? TotalAmtDed { get; set; }   
        public string? TotalAmtTDS { get; set; }   
        public string? TotalAmtExtras { get; set; }  
        public string? NetAmtPaid { get; set; }   
        public string? Remarks { get; set; }   
        public string? PmtType { get; set; }   
        public string? NeftYN { get; set; }   
        public string? ChequeNo { get; set; }   
        public string? ChequeDate { get; set; }   
        public string? CreditAc { get; set; }   
        public string? FinDocid { get; set; }   
        public string? FinDocidJV { get; set; }   
        public string? YearId { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? LoggedInUser { get; set; }
        public List<VendorPmtDtlModel> vendorPmtDetailList { get; set; }
    }
}
