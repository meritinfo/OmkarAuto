using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class SparesPurchaseRptModel
    {
        public string? BranchName { get; set; }
        public string? TransDate { get; set; }
        public string? VendorName { get; set; }
        public string? VendorInvNo { get; set; }
        public string? VendorGstNo { get; set; }
        public string? GstType { get; set; }
        public string? ItemAmount { get; set; }
        public string? TotBillAmt { get; set; }
    }
}
