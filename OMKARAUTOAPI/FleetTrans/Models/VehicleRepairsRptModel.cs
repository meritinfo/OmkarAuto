using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class VehicleRepairsRptModel
    {
        public string? BranchName { get; set; }
        public string? TransDate { get; set; }
        public string? VehicleNo { get; set; }
        public string? MaintenanceDesc { get; set; }
        public string? VendorName { get; set; }
        public string? VendorGstNo { get; set; }
        public string? GstType { get; set; }
        public string? ItemAmount { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstAmt { get; set; }
        public string? ItemNetAmount { get; set; }
        public string? OtherAmount { get; set; }
        public string? RoundOff { get; set; }
        public string? NetAmount { get; set; }
    }
}
